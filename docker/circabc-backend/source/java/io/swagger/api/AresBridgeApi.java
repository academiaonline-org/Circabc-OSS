package io.swagger.api;

import eu.cec.digit.circabc.repo.external.repositories.RepositoryConfiguration;

import java.util.Collection;

public interface AresBridgeApi {

    String getTicket(String requestDate, String httpVerb, String path);

    Collection<RepositoryConfiguration> getExternalRepositories(String id);

    void addExternalRepositories(String id, String name);

    void deleteExternalRepository(String id, String name);

    Collection<String> getAvailableExternalRepositories();

    boolean validateTicket(String dateHeader, String authorizationHeader, String ticket);

    void saveTransaction(
            String repositoryId, String transactionId, String nodeId, String versionLabel);
}
