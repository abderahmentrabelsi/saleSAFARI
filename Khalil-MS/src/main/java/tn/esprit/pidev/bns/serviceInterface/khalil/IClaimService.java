package tn.esprit.pidev.bns.serviceInterface.khalil;

import com.google.zxing.WriterException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pidev.bns.entity.khalil.Claim;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;
import java.util.List;
public interface IClaimService {

    public ResponseEntity<ByteArrayResource> createClaim(Claim claim, MultipartFile file) throws IOException, WriterException;

    Claim createClaim(Claim claim);

    public List<Claim> getAllClaims();

    public Claim updateClaim(Integer idClaim, Claim claim);

    public void deleteClaim(Integer idClaim);

    public List<Claim> getClaimsByEtat(boolean treated);

    public List<Claim> getClaimsByCreationDate(Date debut, Date fin);

    public List<Claim> getClaimsByProcessingDate(Date debut, Date fin);

    public Claim traiterClaim(Integer idClaim);

    public ResponseEntity<Resource> downloadFiles (String filename) throws IOException;

    Claim retrieveClaim(Integer idClaim);

    BufferedImage generateQRCodeImage(String idClaim) throws WriterException;

}
