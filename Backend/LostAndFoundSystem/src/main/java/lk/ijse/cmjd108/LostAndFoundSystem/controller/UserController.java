package lk.ijse.cmjd108.LostAndFoundSystem.controller;

import lk.ijse.cmjd108.LostAndFoundSystem.dto.UserDTO;
import lk.ijse.cmjd108.LostAndFoundSystem.exception.UserNotFoundException;
import lk.ijse.cmjd108.LostAndFoundSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/LostAndFoundSystem/User")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    private ResponseEntity<Void> addUser (@RequestBody UserDTO userDTO){
        if(userDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try{
            userService.addUser(userDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        if(userDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            return ResponseEntity.ok(userService.login(userDTO));
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/adminUserStaff/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> updateUserDetails (@PathVariable String userId, @RequestBody UserDTO userDTO){
        if(userId == null || userDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try{
            userService.updateUserDetails(userId, userDTO);
            return ResponseEntity.noContent().build();
        }
        catch (UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/adminUserStaff/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @DeleteMapping("/admin/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId){
        if(userId == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try{
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        }
        catch (UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
