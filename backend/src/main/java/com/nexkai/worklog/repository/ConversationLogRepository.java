package com.nexkai.worklog.repository;

import com.nexkai.worklog.domain.ConversationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationLogRepository extends JpaRepository<ConversationLog, Long> {
}
