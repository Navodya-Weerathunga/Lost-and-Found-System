package lk.ijse.cmjd108.LostAndFoundSystem.config;

import lk.ijse.cmjd108.LostAndFoundSystem.dto.Role;
import lk.ijse.cmjd108.LostAndFoundSystem.service.Impl.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request-> request
                        .requestMatchers("/LostAndFoundSystem/User/register").permitAll()
                        .requestMatchers("/LostAndFoundSystem/User/login").permitAll()
                        .requestMatchers("/LostAndFoundSystem/Request/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/LostAndFoundSystem/User/admin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/LostAndFoundSystem/User/admin/**").hasRole(Role.USER.name())
                        .requestMatchers("/staff/**").hasAuthority(Role.STAFF.name())
                        .requestMatchers("/LostAndFoundSystem/User/adminUserStaff/**").hasAnyRole("ADMIN", "STAFF", "USER")
                        .requestMatchers("/LostAndFoundSystem/Item/adminUserStaff/**").hasAnyRole("ADMIN", "STAFF", "USER")
                        .requestMatchers("/LostAndFoundSystem/Request/adminUserStaff/**").hasAnyRole("ADMIN", "STAFF", "USER")
                        .requestMatchers("/LostAndFoundSystem/Request/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(manager->manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }
}
