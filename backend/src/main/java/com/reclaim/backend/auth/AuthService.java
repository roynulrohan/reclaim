package com.reclaim.backend.auth;

import com.reclaim.backend.user.User;
import com.reclaim.backend.user.UserRepository;
import com.reclaim.backend.user.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password());
        try {
            authenticationManager.authenticate(authenticationRequest);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        User user = userRepository.findByUsername(request.username()).orElseThrow();
        return new LoginResponse(tokenService.createToken(user), UserResponse.from(user));
    }

    public UserResponse getCurrentUser(Jwt jwt) {
        Long userId = Long.valueOf(jwt.getSubject());
        User user = userRepository.findById(userId).orElse(null);

        if (user == null || !user.isEnabled()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "This account no longer has access");
        }

        return UserResponse.from(user);
    }
}
