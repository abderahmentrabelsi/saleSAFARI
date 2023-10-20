package com.example.market_ms.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.json.JsonMergePatch;
import javax.json.JsonValue;

@Component
public class PatchUtil {

    @Autowired
    private ObjectMapper mapper;

    public PatchUtil() {
    }

    public <T> T mergePatch(JsonMergePatch mergePatch, T targetBean, Class<T> beanClass) {
        JsonValue target = mapper.convertValue(targetBean, JsonValue.class);
        JsonValue patched = applyMergePatch(mergePatch, target);
        return convertAndValidate(patched, beanClass);
    }

    public Object unsafeMergePatch(JsonMergePatch mergePatch, Object targetBean, Class<?> beanClass) {
        JsonValue target = mapper.convertValue(targetBean, JsonValue.class);
        JsonValue patched = applyMergePatch(mergePatch, target);
        return convertAndValidate(patched, beanClass);
    }

    private JsonValue applyMergePatch(JsonMergePatch mergePatch, JsonValue target) {
        try {
            return mergePatch.apply(target);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private <T> T convertAndValidate(JsonValue jsonValue, Class<T> beanClass) {
        T bean = mapper.convertValue(jsonValue, beanClass);
        return bean;
    }
}