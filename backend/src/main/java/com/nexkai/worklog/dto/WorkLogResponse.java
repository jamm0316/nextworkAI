package com.nexkai.worklog.dto;

import com.nexkai.worklog.domain.WorkLog;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record WorkLogResponse(
        Long id,
        LocalDate date,
        String todayWork,
        String retrospective,
        String tomorrowAction,
        LocalDateTime createdAt) {
    public static WorkLogResponse from(WorkLog workLog) {
        return new WorkLogResponse(
                workLog.getId(),
                workLog.getDate(),
                workLog.getTodayWork(),
                workLog.getRetrospective(),
                workLog.getTomorrowAction(),
                workLog.getCreatedAt());
    }
}
