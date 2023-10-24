package tn.esprit.pidev.bns.controller.khalil;

import com.google.zxing.WriterException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pidev.bns.entity.khalil.Claim;
import tn.esprit.pidev.bns.repository.khalil.ClaimRepository;
import tn.esprit.pidev.bns.serviceInterface.khalil.IClaimService;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/claim")
public class ClaimRestController {
    @Autowired
    IClaimService claimService;


    @Autowired
    private ClaimRepository claimRepository;

    //http://localhost:9000/bns/claim/create-claim
    @PostMapping("/create-claim")
    public ResponseEntity<Claim> createClaim(@RequestBody Claim claim) {
        try {
            // Perform any additional logic or validation before saving the claim
            if (claim == null) {
                // Handle the case where the claim is null (for example, throw an exception)
                throw new IllegalArgumentException("Claim object cannot be null");
            }

            // You can add more validation or business logic here...

            // Set default values or perform any pre-processing before saving the claim
            claim.setCreationDate(new Date()); // Set the creation date to the current date
            claim.setTreated(false); // Set treated status to false initially

            // Save the claim to the database
            Claim savedClaim = claimRepository.save(claim);

            // Additional processing, if needed...

            return new ResponseEntity<>(savedClaim, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions, log error, etc.
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //http://localhost:9000/bns/claim/addclaim
    @PostMapping("/addclaim")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> createClaim(Claim c , @RequestParam("img")MultipartFile file) throws IOException, WriterException {
        return claimService.createClaim(c,file);
    }

    //define a method to download files
    //http://localhost:9000/bns/claim/download/{filename}
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFiles (@PathVariable("filename") String filename) throws IOException {
        return  claimService.downloadFiles(filename);
    }



    //http://localhost:9000/bns/claim/retrieve-all-claims
    @GetMapping("/retrieve-all-claims")
    public List<Claim> getAllClaims() {
        List<Claim> listClaims = claimService.getAllClaims();
        return listClaims;
    }

    //http://localhost:9000/bns/claim/retrieve-claim/id
    @GetMapping("/retrieve-claim/{idClaim}")
    public Claim retrieveClaim(@PathVariable("idClaim") Integer idClaim) {
        return claimService.retrieveClaim(idClaim);
    }

    //http://localhost:9000/bns/claim/traiterClaim/id
    @GetMapping("/traiterClaim/{idClaim}")
    public Claim traiterClaim(@PathVariable("idClaim") Integer idClaim) {
        return claimService.traiterClaim(idClaim);
    }

    //http://localhost:9000/bns/claim/getClaimsByEtat/1 or 0
    @GetMapping("/getClaimsByEtat/{treated}")
    public List<Claim> getClaimsByEtat(@PathVariable("treated") boolean treated) {
        return claimService.getClaimsByEtat(treated);
    }

    //http://localhost:9000/bns/claim/ByCreationDate?debut=2023-03-05&fin=2023-03-06
    @GetMapping("/ByCreationDate")
    public List<Claim> getClaimsByCreationDate(@RequestParam ("debut")  @DateTimeFormat(pattern = "yyyy-MM-dd") Date debut,
                                          @RequestParam ("fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fin) {
        //SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        List<Claim> claims = claimService.getClaimsByCreationDate(debut, fin);
        return claims;
    }

    //http://localhost:9000/bns/claim/ByProcessingDate?debut=2023-03-05&fin=2023-03-06
    @GetMapping("/ByProcessingDate")
    public List<Claim> getClaimsByProcessingDate(@PathVariable ("debut") @DateTimeFormat(pattern = "yyyy-MM-dd") Date debut,
                                          @PathVariable ("fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fin) {
        List<Claim> claims = claimService.getClaimsByProcessingDate(debut, fin);
        return claims;
    }


    //http://localhost:9000/bns/claim/remove-claim/1
    @DeleteMapping("/remove-claim/{idClaim}")
    public void deleteClaim (@PathVariable("idClaim") Integer idClaim) {
        claimService.deleteClaim(idClaim);
    }




}
