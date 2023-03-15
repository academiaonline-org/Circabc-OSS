package eu.cec.digit.circabc.repo.ares;

import org.mybatis.spring.SqlSessionTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AresBridgeDaoServiceImpl implements AresBridgeDaoService {

    private SqlSessionTemplate sqlSessionTemplate = null;

    @Override
    public void deleteResponse(String transactionId, String requestType) {
        Map<String, Object> params = new HashMap<>();

        params.put("transactionId", transactionId);
        params.put("requestType", requestType);

        sqlSessionTemplate.delete("AresBridge.delete_response", params);
    }

    @Override
    public void saveResponse(
            String transactionId,
            String requestType,
            String documentId,
            String saveNumber,
            String registrationNumber) {
        Map<String, Object> params = new HashMap<>();

        params.put("transactionId", transactionId);
        params.put("requestType", requestType);
        params.put("documentId", documentId);
        params.put("saveNumber", saveNumber);
        params.put("registrationNumber", registrationNumber);

        sqlSessionTemplate.insert("AresBridge.insert_response", params);
    }

    @Override
    public void saveRequest(String transactionId, String nodeId, String versionLabel) {
        Map<String, Object> params = new HashMap<>();

        params.put("transactionId", transactionId);
        params.put("nodeId", nodeId);
        params.put("versionLabel", versionLabel);
        sqlSessionTemplate.insert("AresBridge.insert_request", params);
    }

    @Override
    public List<AresBridgeDAO> getResponses() {
        return (List<AresBridgeDAO>) sqlSessionTemplate.selectList("AresBridge.select_responses");
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
}
