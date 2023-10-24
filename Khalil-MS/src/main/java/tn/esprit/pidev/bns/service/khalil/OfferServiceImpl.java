package tn.esprit.pidev.bns.service.khalil;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import tn.esprit.pidev.bns.entity.khalil.Offer;
import tn.esprit.pidev.bns.repository.khalil.OfferRepository;
import tn.esprit.pidev.bns.serviceInterface.khalil.IOfferService;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.core.io.ResourceLoader;
import org.thymeleaf.context.Context;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class OfferServiceImpl implements IOfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private ResourceLoader resourceLoader;


    public Offer createOffer(Offer offer) throws EmailException {

        //HtmlEmail email = new HtmlEmail();
        //
        //email.setHostName("smtp.gmail.com");
        //email.setSmtpPort(587);
        //email.setAuthentication("khalil.turki@esprit.tn", "");
        //email.setStartTLSEnabled(true);
        //email.addTo("khalil.turki@esprit.tn");
        //email.setFrom("ss@sss.com");
        //System.out.println(offer.getBusinessEmail()) ;
        //email.setSubject("APPEL D'OFFRE");
        //
        //
        //Context context = new Context();
        //context.setVariable("offer", offer);
        //String html = templateEngine.process("email-template", context);
        //email.setHtmlMsg(html);
        //
        //email.send();

        return offerRepository.save(offer);
    }

    @Override
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @Override
    public Offer getOfferById(Integer idOffer) {
        return offerRepository.findById(idOffer).orElseThrow(() -> new RuntimeException("Offer not found"));
    }

    @Override
    public void deleteOffer(Integer idOffer) {
        offerRepository.deleteById(idOffer);
    }

    public void createExcelFile(List<Offer> offers,String filePath) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Offers");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Name");
        headerRow.createCell(2).setCellValue("Description");
        headerRow.createCell(3).setCellValue("BusinessType");
        headerRow.createCell(4).setCellValue("BusinessEmail");
        headerRow.createCell(5).setCellValue("StartDate");
        headerRow.createCell(6).setCellValue("EndDate");
        int rowNum = 1;
        for (Offer offer : offers) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(offer.getIdOffer());
            row.createCell(1).setCellValue(offer.getNamePer());
            row.createCell(2).setCellValue(offer.getDescription());
            row.createCell(3).setCellValue(offer.getBusinessType().toString());
            row.createCell(4).setCellValue(offer.getBusinessEmail());

            Date datestart = offer.getStartDate() ;
            SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd") ;
            String formatedstardate = dateformat.format(datestart) ;

            row.createCell(5).setCellValue(formatedstardate);

            Date dateend = offer.getEndDate() ;
            String formatedenddate = dateformat.format(dateend) ;

            row.createCell(6).setCellValue(formatedenddate);
        }
        try (OutputStream fileOut = new FileOutputStream(filePath)) {
            workbook.write(fileOut);
        }
        workbook.close();
    }


    // autres méthodes de gestion des appels d'offre
    }
