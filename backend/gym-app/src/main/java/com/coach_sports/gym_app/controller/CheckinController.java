package com.coach_sports.gym_app.controller;

import com.coach_sports.gym_app.dto.CheckinDto;
import com.coach_sports.gym_app.dto.CheckinResponseDto;
import com.coach_sports.gym_app.service.CheckinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/checkins")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CheckinController {

    private final CheckinService checkinService;

    @GetMapping
    public ResponseEntity<List<CheckinResponseDto>> getAllCheckins() {
        return ResponseEntity.ok(checkinService.getAllCheckins());
    }

    @PostMapping
    public ResponseEntity<CheckinResponseDto> registerCheckin(@RequestBody CheckinDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(checkinService.registerCheckin(request));
    }
}
