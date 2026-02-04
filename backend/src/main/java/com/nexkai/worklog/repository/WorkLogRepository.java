package com.nexkai.worklog.repository;

import com.nexkai.worklog.domain.WorkLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {
    Optional<WorkLog> findByDate(LocalDate date);
}
