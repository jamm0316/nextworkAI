package com.nexkai.worklog.service;

import com.nexkai.worklog.domain.ConversationLog;
import com.nexkai.worklog.domain.WorkLog;
import com.nexkai.worklog.dto.WorkLogResponse;
import com.nexkai.worklog.repository.ConversationLogRepository;
import com.nexkai.worklog.repository.WorkLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WorkLogService {

    private final WorkLogRepository workLogRepository;
    private final ConversationLogRepository conversationLogRepository;

    public void saveConversation(String content) {
        ConversationLog logEntry = ConversationLog.builder()
                .content(content)
                .build();
        conversationLogRepository.save(logEntry);
        log.info("Saved conversation log id: {}", logEntry.getId());
    }

    public WorkLogResponse generateWorkLog(LocalDate date) {
        // 1. Fetch conversation logs for the date (simple filtering by created_at
        // range)
        // ideally repo finds by date range. MVP: just get all and filter in memory? No,
        // bad.
        // Let's assume we capture today's logs.
        // For MVP, we'll just extract all recent logs or implement a repo method later.
        // Placeholder logic:

        // 2. Mock Context Extraction
        String summary = "Automated Work Log for " + date;
        String retro = "Retrospective placeholder";
        String action = "Action items placeholder";

        // 3. Save or Update
        Optional<WorkLog> existing = workLogRepository.findByDate(date);
        WorkLog workLog;
        if (existing.isPresent()) {
            workLog = existing.get();
            workLog.setTodayWork(summary);
            workLog.setRetrospective(retro);
            workLog.setTomorrowAction(action);
        } else {
            workLog = WorkLog.builder()
                    .date(date)
                    .todayWork(summary)
                    .retrospective(retro)
                    .tomorrowAction(action)
                    .build();
        }

        WorkLog saved = workLogRepository.save(workLog);
        return WorkLogResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<WorkLogResponse> getAllWorkLogs() {
        return workLogRepository.findAll().stream()
                .map(WorkLogResponse::from)
                .collect(Collectors.toList());
    }
}
