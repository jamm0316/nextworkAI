package com.nexkai.worklog.controller;

import com.nexkai.worklog.dto.IngestRequest;
import com.nexkai.worklog.dto.WorkLogResponse;
import com.nexkai.worklog.service.WorkLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/worklogs")
@RequiredArgsConstructor
@Tag(name = "WorkLogs", description = "Work Log Management APIs")
public class WorkLogController {

    private final WorkLogService workLogService;

    @Operation(summary = "Ingest Conversation Log", description = "Save raw conversation logs from AI chat")
    @PostMapping("/ingest")
    public ResponseEntity<Void> ingestLog(@RequestBody IngestRequest request) {
        workLogService.saveConversation(request.content());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Generate Daily Work Log", description = "Trigger generation of structured work log for a specific date")
    @PostMapping("/generate")
    public ResponseEntity<WorkLogResponse> generateWorkLog(@RequestParam(required = false) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }
        WorkLogResponse response = workLogService.generateWorkLog(date);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get All Work Logs", description = "Retrieve all generated work logs")
    @GetMapping
    public ResponseEntity<List<WorkLogResponse>> getAllLogs() {
        return ResponseEntity.ok(workLogService.getAllWorkLogs());
    }
}
