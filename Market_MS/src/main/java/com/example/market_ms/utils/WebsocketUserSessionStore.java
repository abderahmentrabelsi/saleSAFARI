package com.example.market_ms.utils;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class WebsocketUserSessionStore {
    private Lock lock = new ReentrantLock();
    private HashMap<String, String> store = new HashMap<>();

    public void add(String sessionId, String userId) {
        lock.lock();
        try {
            store.compute(sessionId, (k, v) -> userId);
        } finally {
            lock.unlock();
        }
    }

    public String getSessionId(String userId) {
        lock.lock();
        try {
            return store.entrySet().stream()
                    .filter(it -> it.getValue().equals(userId))
                    .map(it -> it.getKey())
                    .findFirst()
                    .orElse(null);
        } finally {
            lock.unlock();
        }
    }

    public void remove(String sessionId) {
        lock.lock();
        try {
            store.remove(sessionId);
        } finally {
            lock.unlock();
        }
    }

    public void remove(Long userId) {
        lock.lock();
        try {
            store.values().remove(userId);
        } finally {
            lock.unlock();
        }
    }
}