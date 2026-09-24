package com.reclaim.backend.user;

import org.springframework.boot.context.properties.ConfigurationProperties;

// Credentials for the first admin, from ADMIN_USERNAME and ADMIN_PASSWORD.
@ConfigurationProperties("app.admin")
public record AdminProperties(String username, String password) {
}
