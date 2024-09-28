package io.cynicdog.authenticatedservice.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("remote-service")
public class Controller {

    private static final Logger log = LoggerFactory.getLogger(Controller.class);

    @GetMapping("/check")
    public Mono<String> processAuthorizedRemoteCall(@AuthenticationPrincipal Jwt jwt) {
        log.info("Fetching all orders");

        return Mono.just("Awesome 👍🏻, here's the reply from the remote service.");
    }

}