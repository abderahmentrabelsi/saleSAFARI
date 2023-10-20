package com.example.market_ms.lib;



//import EntityNotFoundException
import com.example.market_ms.exception.EntityNotFoundException;
import com.example.market_ms.utils.PatchUtil;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.stereotype.Component;

import javax.json.JsonMergePatch;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Component
@Slf4j
public abstract class AbstractCrudService<T extends AbstractEntity<?>> {
    @Autowired
    private AbstractRepository<T> repository;

    @Autowired private PatchUtil patchUtil;

    public T create(T entity) {
        try {
            entity.setCreatedDate(LocalDateTime.now());
            return repository.save(entity);
        } catch (JpaObjectRetrievalFailureException e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }

    public T update(Integer id, T entity) {
        if (!existsById(id)) {
            throw new EntityNotFoundException();
        }
        entity.setLastModifiedDate(LocalDateTime.now());
        entity.setId(id);

        return repository.save(entity);
    }

    public void delete(T entity) {
        repository.delete(entity);
    }

    public T findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found"));
    }


    public Iterable<T> findAll() {
        return repository.findAll();
    }

    public Iterable<T> findAllById(Iterable<Integer> ids) {
        return repository.findAllById(ids);
    }

    public long count() {
        return repository.count();
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public void deleteAll() {
        repository.deleteAll();
    }

    public void deleteAll(Iterable<T> entities) {
        repository.deleteAll(entities);
    }

    public void deleteAllById(Iterable<Integer> ids) {
        repository.deleteAllById(ids);
    }

    public List<T> getAll() {
        return repository.findAll();
    }

    public T patch(Integer id, JsonMergePatch patchRequest) {
        Class<T> clazz = (Class<T>) ((java.lang.reflect.ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        T entity = findById(id);
        return patchUtil.mergePatch(patchRequest, entity, clazz);
    }



}
