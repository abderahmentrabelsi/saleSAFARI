package tn.esprit.pidev.bns.controller.khalil;

import lombok.AllArgsConstructor;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.bns.entity.khalil.Offer;
import tn.esprit.pidev.bns.service.khalil.OfferServiceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class OfferRestController {
        @Autowired
        OfferServiceImpl OfferService;

        //http://localhost:9000/bns/offer/add-offer
        @PostMapping("/add-offer")
        public Offer createOffer(@RequestBody Offer o) throws EmailException {
            Offer offer = OfferService.createOffer(o);
            return offer;
        }

    //http://localhost:9000/bns/offer/retrieve-all-offers
    @GetMapping("/retrieve-all-offers")
    public List<Offer> getAllOffers() {
        List<Offer> listOffers = OfferService.getAllOffers();
        return listOffers;
    }

    //http://localhost:9000/bns/offer/retrieve-offer
    @GetMapping("/retrieve-offer/{idOffer}")
    public Offer getOfferById(@PathVariable("idOffer") Integer idOffer) {
        return OfferService.getOfferById(idOffer);
    }


    //http://localhost:9000/bns/offer/remove-offer
    @DeleteMapping("/remove-offer/{idOffer}")
    public void deleteOffer (@PathVariable("idOffer") Integer idOffer) {
        OfferService.deleteOffer(idOffer);
    }


    @GetMapping("/downloadOfferList")
    public ResponseEntity<byte[]> downloadOffers() throws IOException {
        List<Offer> offers = OfferService.getAllOffers();
        String filePath = "C:\\Users\\USER\\Downloads\\offers.xlsx";
        OfferService.createExcelFile(offers, filePath);
        byte[] excelBytes = Files.readAllBytes(Paths.get(filePath));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "offers.xlsx");
        headers.setContentLength(excelBytes.length);
        return ResponseEntity.ok()
                .headers(headers)
                .body(excelBytes);
    }
        // autres méthodes REST pour la gestion des appels d'offre
    }
