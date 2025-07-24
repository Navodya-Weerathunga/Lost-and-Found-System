package lk.ijse.cmjd108.LostAndFoundSystem.service.Impl;

import lk.ijse.cmjd108.LostAndFoundSystem.dao.UserDao;
import lk.ijse.cmjd108.LostAndFoundSystem.dto.UserDTO;
import lk.ijse.cmjd108.LostAndFoundSystem.entity.User;
import lk.ijse.cmjd108.LostAndFoundSystem.exception.UserNotFoundException;
import lk.ijse.cmjd108.LostAndFoundSystem.service.UserService;
import lk.ijse.cmjd108.LostAndFoundSystem.util.EntityDtoConversion;
import lk.ijse.cmjd108.LostAndFoundSystem.util.JWTUtils;
import lk.ijse.cmjd108.LostAndFoundSystem.util.UtilData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private EntityDtoConversion entityDtoConversion;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public void addUser(UserDTO userDTO) {
        Optional<User> foundUser = userDao.findByEmail(userDTO.getEmail());

        if(foundUser.isEmpty()){
            userDTO.setUserId(UtilData.generateUserId());
            userDTO.setRegisteredDate(UtilData.generateToday());
            userDTO.setRegisteredTime(UtilData.generateNow());
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));

            User newUser = entityDtoConversion.convertUserDtoToUserEntity(userDTO);
            userDao.save(newUser);
        }
        else{
            throw new RuntimeException ("User is already registered!");
        }
    }

    @Override
    public UserDTO login(UserDTO userDTO) {
        UserDTO responseDTO = new UserDTO();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDTO.getEmail(),
                            userDTO.getPassword()
                    )
            );

            var user = userDao.findByEmail(userDTO.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));


            var jwt = jwtUtils.generateToken(user);

            responseDTO.setUserId(user.getUserId());
            responseDTO.setEmail(user.getEmail());
            responseDTO.setRole(user.getRole());
            responseDTO.setToken(jwt);
            responseDTO.setExpirationTime("24Hrs");
            responseDTO.setIsLogin(true);
            responseDTO.setMessage("Login Success");


            return responseDTO;

        } catch (BadCredentialsException e) {
            responseDTO.setIsLogin(false);
            responseDTO.setMessage("Login Fail");
            return responseDTO;
        }
    }

    @Override
    public void updateUserDetails(String userId, UserDTO userDTO) {
        Optional<User> foundUser = userDao.findById(userId);
        if(foundUser.isPresent()){
            User user = foundUser.get();
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setDepartment(userDTO.getDepartment());

            userDao.save(user);
        }
        else {
            throw new UserNotFoundException("User not found");
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return entityDtoConversion.toUserDtoList(userDao.findAll());
    }

    @Override
    public UserDTO getUserById(String userId) {
        Optional<User> foundUser = userDao.findById(userId);
        if(foundUser.isPresent()){
            User selectedUser = userDao.getReferenceById(userId);
            return entityDtoConversion.convertUserEntityToUserDto(selectedUser);
        }

        else{
            throw new UserNotFoundException("User not found");
        }

    }

    @Override
    public void deleteUser(String userId) {
        Optional<User>foundUser = userDao.findById(userId);

        if(foundUser.isPresent()){
            userDao.deleteById(userId);
        }
        else {
            throw new UserNotFoundException("User not found");
        }
    }

}
