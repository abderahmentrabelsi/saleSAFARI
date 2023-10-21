package tn.esprit.pidev.bns.repository.khalil;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tn.esprit.pidev.bns.entity.khalil.Claim;

import java.util.Date;
import java.util.List;

@Repository
public interface ClaimRepository extends CrudRepository<Claim, Integer> {
    List<Claim> findByTreated(boolean treated);
    List<Claim> findByCreationDateBetween(Date debut, Date fin);
    List<Claim> findByProcessingDateBetween(Date debut, Date fin);

}
