package lk.ijse.cmjd108.LostAndFoundSystem.config;

import lk.ijse.cmjd108.LostAndFoundSystem.util.JWTUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public JWTUtils jwtUtils() {
        return new JWTUtils();
    }
}
