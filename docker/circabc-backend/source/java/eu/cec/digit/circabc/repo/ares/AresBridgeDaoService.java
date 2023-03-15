package eu.cec.digit.circabc.repo.ares;

import java.util.List;

public interface AresBridgeDaoService {
    void deleteResponse(String transactionId, String requestType);

    void saveResponse(
            String transactionId,
            String requestType,
            String documentId,
            String saveNumber,
            String registrationNumber);

    void saveRequest(String transactionId, String nodeId, String versionLabel);

    List<AresBridgeDAO> getResponses();
}
