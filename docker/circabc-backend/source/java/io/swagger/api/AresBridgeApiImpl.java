package io.swagger.api;

import eu.cec.digit.circabc.repo.ares.AresBridgeDaoService;
import eu.cec.digit.circabc.repo.external.repositories.RepositoryConfiguration;
import eu.cec.digit.circabc.service.external.repositories.ExternalRepositoriesManagementService;
import io.swagger.util.Converter;

import java.util.ArrayList;
import java.util.Collection;

import static io.swagger.util.ares.TokenUtils.generateToken;
import static io.swagger.util.ares.TokenUtils.validateToken;

public class AresBridgeApiImpl implements AresBridgeApi {

    public static final String ARES_BRIDGE = "AresBridge";
    private String applicationName;
    private String apiKey;
    private String secret;
    private String baseURL;
    private String serviceURL;
    private String uiURL;
    private String redirectURL;
    private String callbackURL;
    private ExternalRepositoriesManagementService externalRepositoriesManagementService;
    private AresBridgeDaoService aresBridgeDaoService;

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getCallbackURL() {
        return callbackURL;
    }

    public void setCallbackURL(String callbackURL) {
        this.callbackURL = callbackURL;
    }

    public String getRedirectURL() {
        return redirectURL;
    }

    public void setRedirectURL(String redirectURL) {
        this.redirectURL = redirectURL;
    }

    public String getUiURL() {
        return uiURL;
    }

    public void setUiURL(String uiURL) {
        this.uiURL = uiURL;
    }

    public String getServiceURL() {
        return serviceURL;
    }

    public void setServiceURL(String serviceURL) {
        this.serviceURL = serviceURL;
    }

    public String getBaseURL() {
        return baseURL;
    }

    public void setBaseURL(String baseURL) {
        this.baseURL = baseURL;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public String getTicket(String requestDate, String httpVerb, String path) {
        return generateToken(this.apiKey, this.secret, requestDate, httpVerb, path);
    }

    @Override
    public Collection<RepositoryConfiguration> getExternalRepositories(String id) {
        String parentNodeId = Converter.createNodeRefFromId(id).toString();
        return this.externalRepositoriesManagementService.getConfiguredRepositories(parentNodeId);
    }

    @Override
    public void addExternalRepositories(String id, String name) {
        String parentNodeId = Converter.createNodeRefFromId(id).toString();
        RepositoryConfiguration configuration = new RepositoryConfiguration();
        configuration.setName(name);
        this.externalRepositoriesManagementService.addRepository(parentNodeId, configuration);
    }

    @Override
    public void deleteExternalRepository(String id, String name) {
        String parentNodeId = Converter.createNodeRefFromId(id).toString();
        this.externalRepositoriesManagementService.removeRepository(parentNodeId, name);
    }

    @Override
    public Collection<String> getAvailableExternalRepositories() {
        Collection<String> result = new ArrayList<>(1);
        result.add(ARES_BRIDGE);
        return result;
    }

    @Override
    public boolean validateTicket(String dateHeader, String ticket, String path) {
        return validateToken(ticket, apiKey, secret, dateHeader, "POST", path);
    }

    @Override
    public void saveTransaction(
            String repositoryId, String transactionId, String nodeId, String versionLabel) {
        this.aresBridgeDaoService.saveRequest(transactionId, nodeId, versionLabel);
    }

    public ExternalRepositoriesManagementService getExternalRepositoriesManagementService() {
        return externalRepositoriesManagementService;
    }

    public void setExternalRepositoriesManagementService(
            ExternalRepositoriesManagementService externalRepositoriesManagementService) {
        this.externalRepositoriesManagementService = externalRepositoriesManagementService;
    }

    public AresBridgeDaoService getAresBridgeDaoService() {
        return aresBridgeDaoService;
    }

    public void setAresBridgeDaoService(AresBridgeDaoService aresBridgeDaoService) {
        this.aresBridgeDaoService = aresBridgeDaoService;
    }
}
