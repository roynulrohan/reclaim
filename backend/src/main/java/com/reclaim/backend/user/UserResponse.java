package com.reclaim.backend.user;

// What the API sends back about a user. Never includes the password hash.
public record UserResponse(Long id, String username, Role role) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getRole());
    }
}
