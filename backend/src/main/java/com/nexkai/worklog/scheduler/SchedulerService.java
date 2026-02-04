package com.nexkai.worklog.scheduler;

import com.nexkai.worklog.service.WorkLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final WorkLogService workLogService;

    // 09:00 AM
    @Scheduled(cron = "0 0 9 * * *")
    public void generateMorningDraft() {
        log.info("Scheduler: Generating morning draft work log.");
        workLogService.generateWorkLog(LocalDate.now());
    }

    // 12:00 PM
    @Scheduled(cron = "0 0 12 * * *")
    public void generateNoonSummary() {
        log.info("Scheduler: Generating noon summary work log.");
        workLogService.generateWorkLog(LocalDate.now());
    }

    // 06:00 PM (18:00)
    @Scheduled(cron = "0 0 18 * * *")
    public void generateEveningSummary() {
        log.info("Scheduler: Generating evening closing work log.");
        workLogService.generateWorkLog(LocalDate.now());
    }
}
