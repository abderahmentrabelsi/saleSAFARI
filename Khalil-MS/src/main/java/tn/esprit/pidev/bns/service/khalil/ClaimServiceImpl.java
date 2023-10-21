package tn.esprit.pidev.bns.service.khalil;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pidev.bns.entity.khalil.BadWord;
import tn.esprit.pidev.bns.entity.khalil.Claim;
import tn.esprit.pidev.bns.repository.khalil.ClaimRepository;
import tn.esprit.pidev.bns.serviceInterface.khalil.IClaimService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.*;
import java.util.regex.Pattern;


@Slf4j
@Service
public class ClaimServiceImpl implements IClaimService {
    @Autowired
    private ClaimRepository claimRepository;

    private static final String CHARSET = "UTF-8";
    private static final int QR_CODE_SIZE = 300;
    //SMS
    private final String ACCOUNT_SID = "AC610b7baa5c9c1a94eb0d1d785aaf5325";

    private final String AUTH_TOKEN = "7b53d37d606f19e25b8e209196234161";

    private final String FROM_NUMBER = "+15746525212";


    //upload File
    public static String uploadDirectory = "C:\\Users\\USER\\Desktop\\images\\";


    public ResponseEntity<ByteArrayResource> createClaim(Claim c, MultipartFile file) throws IOException, WriterException {

        String filterdesc = DescriptionFilter.filterdesc(c.getDescription()) ;

        StringBuilder fileNames = new StringBuilder();
        String filename = c.getIdClaim() + file.getOriginalFilename();
        Path fileNameAndPath = Paths.get(uploadDirectory, filename);
        try {
            Files.write(fileNameAndPath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }


        /*Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        sms.setMessage("Dear BNS customer, we have received your complaint request and are processing" +
                " it as soon as possible. We will keep you informed of the status of your request. " +
                "Thank you for your trust");

        Message message = Message.creator(new PhoneNumber(sms.getTo()), new PhoneNumber(FROM_NUMBER), sms.getMessage())
                .create();
        System.out.println("here is my id:" + message.getSid());// Unique resource ID created to manage this transaction

*/

        BufferedImage qrCodeImage = generateQRCodeImage(c.toString());

        // Convert the image to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrCodeImage, "png", baos);
        byte[] qrCodeBytes = baos.toByteArray();



        c.setQrcode(qrCodeBytes);
            c.setDescription(filterdesc);
            c.setCfile(filename);
            c.setCreationDate(new Date());
            c.setTreated(false);
        claimRepository.save(c);

        ByteArrayResource resource = new ByteArrayResource(qrCodeBytes);

        // Return the ByteArrayResource in the response body
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);


    }




    //Download File
    public ResponseEntity<Resource> downloadFiles(String filename) throws IOException {
        Path filePath = Paths.get(uploadDirectory, filename);
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + "was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri()); //filePath.toUri() returns a URI object that represents the URI of the file
        HttpHeaders httpHeaders = new HttpHeaders(); //HttpHeaders can be used to set the headers of an HTTP request or response in Spring applications
        httpHeaders.add("File-Name", filename);//add a new header to the object
        httpHeaders.add(httpHeaders.CONTENT_DISPOSITION, "attachement ; File-Name =" + filename);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .header(String.valueOf(httpHeaders)).body(resource);


    }

    //receive SMS
    public void receive(MultiValueMap<String, String> smscallback) {
    }

    public List<Claim> getAllClaims() {
        return (List<Claim>) claimRepository.findAll();
    }


    @Override
    public Claim updateClaim(Integer idClaim, Claim claim) {
        Claim existingClaim = retrieveClaim(idClaim);
        existingClaim.setSubject(claim.getSubject());
        existingClaim.setDescription(claim.getDescription());
        return claimRepository.save(existingClaim);
    }

    public Claim retrieveClaim(Integer idClaim) {
        return claimRepository.findById(idClaim).orElseThrow(() -> new RuntimeException("Claim not found"));
    }


    @Override
    public void deleteClaim(Integer idClaim) {
        Claim c = retrieveClaim(idClaim);
        claimRepository.delete(c);
    }

    @Override
    public List<Claim> getClaimsByEtat(boolean treated) {
        return claimRepository.findByTreated(treated);
    }

    @Override
    public List<Claim> getClaimsByCreationDate(Date debut, Date fin) {
        return claimRepository.findByCreationDateBetween(debut, fin);
    }

    @Override
    public List<Claim> getClaimsByProcessingDate(Date debut, Date fin) {
        return claimRepository.findByProcessingDateBetween(debut, fin);
    }

    @Override
    public Claim traiterClaim(Integer idClaim) {
        Claim claim = retrieveClaim(idClaim);
        claim.setTreated(true);
        claim.setProcessingDate(new Date());
       // Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        /*sms.setMessage("Dear BNS customer, Dear customer, we are pleased to inform you that your complaint has been successfully processed. " +
                "We invite you to consult your customer area for more information." +
                " Thank you for your trust.");

        Message message = Message.creator(new PhoneNumber(sms.getTo()), new PhoneNumber(FROM_NUMBER), sms.getMessage())
                .create();
        System.out.println("here is my id:" + message.getSid());// Unique resource ID created to manage this transaction
*/
        return claimRepository.save(claim);
    }



    public BufferedImage generateQRCodeImage(String idClaim) throws WriterException {
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        hints.put(EncodeHintType.CHARACTER_SET, CHARSET);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode("claim-" + idClaim, BarcodeFormat.QR_CODE, QR_CODE_SIZE, QR_CODE_SIZE, hints);

        int width = bitMatrix.getWidth();
        BufferedImage image = new BufferedImage(width, width, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < width; y++) {
                image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
            }
        }

        return image;

    }
    public static class DescriptionFilter {

        private static final String FILE_NAME ="BadWordList/BadWords.txt" ;
        private static List<BadWord> BAD_WORDS ;


        static {
            try {
                Path filepath = Paths.get(DescriptionFilter.class.getClassLoader().getResource(FILE_NAME).toURI())  ;
                List<String> lines = Files.readAllLines(filepath) ;
                BAD_WORDS = new ArrayList<>() ;
                for ( String line : lines ) {
                    BAD_WORDS.add(new BadWord(line)) ;
                    System.out.println(BAD_WORDS.toString());
                }
            }catch (IOException e) {
                e.printStackTrace();
                BAD_WORDS= new ArrayList<>() ;
                BAD_WORDS.add(new BadWord("siwar")) ;
            } catch (URISyntaxException e) {
                throw new RuntimeException(e);
            }
        }
        public static String filterdesc(String desc) {
            String filterdesc = desc;
            for (BadWord badword : BAD_WORDS) {
                String regex = "\\b" + Pattern.quote(badword.getWord()) + "\\b";
                String asterisks = String.join("", Collections.nCopies(badword.getWord().length(), "*"));
                filterdesc = filterdesc.replaceAll(regex, asterisks);
            }
            return filterdesc;
        }



    }


}
