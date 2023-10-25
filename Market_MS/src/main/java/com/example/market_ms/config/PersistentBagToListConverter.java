package com.example.market_ms.config;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.hibernate.collection.internal.PersistentBag;

import java.util.ArrayList;
import java.util.List;
//import list


public class PersistentBagToListConverter extends AbstractConverter<PersistentBag, List<?>> {
    @Override
    protected List<?> convert(PersistentBag source) {
        return source == null ? null : new ArrayList<>(source);
    }
}
