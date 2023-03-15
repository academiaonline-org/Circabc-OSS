package eu.cec.digit.circabc.repo.ares;

import eu.cec.digit.circabc.service.external.repositories.ExternalRepositoriesManagementService;
import io.swagger.api.AresBridgeApiImpl;
import io.swagger.util.Converter;
import org.alfresco.service.cmr.repository.NodeRef;

import java.util.List;

public class AresBridgeServiceImpl implements AresBridgeService {

    private AresBridgeDaoService aresBridgeDaoService;
    private ExternalRepositoriesManagementService externalRepositoriesManagementService;

    public AresBridgeDaoService getAresBridgeDaoService() {
        return aresBridgeDaoService;
    }

    public void setAresBridgeDaoService(AresBridgeDaoService aresBridgeDaoService) {
        this.aresBridgeDaoService = aresBridgeDaoService;
    }

    @Override
    public void process() {
        List<AresBridgeDAO> responses = this.aresBridgeDaoService.getResponses();
        for (AresBridgeDAO response : responses) {
            NodeRef nodeRef = Converter.createNodeRefFromId(response.getNodeId());
            String versionLabel = response.getVersionLabel();
            externalRepositoriesManagementService.saveExternalMetadata(
                    AresBridgeApiImpl.ARES_BRIDGE,
                    nodeRef.toString(),
                    response.getDocumentId(),
                    response.getSaveNumber(),
                    response.getRegistrationNumber(),
                    response.getRequestType(),
                    response.getTransactionId());
            aresBridgeDaoService.deleteResponse(response.getTransactionId(), response.getRequestType());
        }
    }

    public ExternalRepositoriesManagementService getExternalRepositoriesManagementService() {
        return externalRepositoriesManagementService;
    }

    public void setExternalRepositoriesManagementService(
            ExternalRepositoriesManagementService externalRepositoriesManagementService) {
        this.externalRepositoriesManagementService = externalRepositoriesManagementService;
    }
}
