package com.reclaim.backend.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AdminSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminProperties admin;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder, AdminProperties admin) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.admin = admin;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() > 0) {
            return;
        }

        if (!StringUtils.hasText(admin.username()) || !StringUtils.hasText(admin.password())) {
            throw new IllegalStateException(
                    "There are no users yet. Set ADMIN_USERNAME and ADMIN_PASSWORD in backend/.env to create the first admin.");
        }

        userRepository.save(new User(admin.username(), passwordEncoder.encode(admin.password()), Role.ADMIN));
        log.info("Created the first admin user '{}'", admin.username());
    }
}
