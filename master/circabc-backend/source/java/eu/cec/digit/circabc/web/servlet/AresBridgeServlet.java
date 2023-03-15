/*******************************************************************************
 * Copyright 2006 European Community
 *
 *  Licensed under the EUPL, Version 1.1 or - as soon they
 *  will be approved by the European Commission - subsequent
 *  versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the
 *  Licence.
 *  You may obtain a copy of the Licence at:
 *
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in
 *  writing, software distributed under the Licence is
 *  distributed on an "AS IS" basis,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied.
 *  See the Licence for the specific language governing
 *  permissions and limitations under the Licence.
 ******************************************************************************/
package eu.cec.digit.circabc.web.servlet;

import eu.cec.digit.circabc.repo.ares.AresBridgeDaoService;
import io.swagger.api.AresBridgeApi;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Handle AresBridge callback
 * save register cancel timeout
 */
public class AresBridgeServlet extends HttpServlet {

    private static final Log logger = LogFactory.getLog(AresBridgeServlet.class);
    @Autowired
    private AresBridgeDaoService aresBridgeDaoService;

    @Autowired
    private AresBridgeApi aresBridgeApi;

    public void init(ServletConfig config) {
        try {
            super.init(config);
        } catch (ServletException e) {
            if (logger.isErrorEnabled()) {
                logger.error("can not init servlet AresBridgeServlet", e);
            }
        }
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
                config.getServletContext());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            authenticate(request);

            String path = StringUtils.substringAfterLast(request.getRequestURI(), "/");
            if (StringUtils.isBlank(path)) {
                throw new Exception("Invalid message received");
            }
            if (!StringUtils.startsWith(request.getContentType(), "application/json")) {
                throw new Exception(
                        "Invalid message received, content type must be application/json instead of " + request.getContentType());
            }
            String requestType;
            switch (path) {
                case "cancel":
                    requestType = "cancel";
                    break;
                case "save":
                    requestType = "save";
                    break;
                case "timeout":
                    requestType = "timeout";
                    break;
                case "register":
                    requestType = "register";
                    break;
                default:
                    throw new Exception("Invalid message received, path /" + path + " is not supported");
            }
            String json = readBody(request);

            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(json);

            String transactionId = String.valueOf(jsonObject.get("transactionId"));
            String documentId = String.valueOf(jsonObject.get("documentId"));
            ;
            String saveNumner = String.valueOf(jsonObject.get("saveNumber"));
            ;
            String registartionNumber = String.valueOf(jsonObject.get("registartionNumber"));
            ;
            aresBridgeDaoService.saveResponse(transactionId, requestType, documentId, saveNumner, registartionNumber);

        } catch (Exception e) {
            if (logger.isErrorEnabled()) {
                logger.error("Error in AresBridge callback", e);
            }
        }
    }


    private String readBody(HttpServletRequest request) throws IOException {
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String json = buffer.toString();
        return json;
    }

    private void authenticate(HttpServletRequest request) throws Exception {

        String authorizationHeader = request.getHeader("Authorization)");
        if (StringUtils.isBlank(authorizationHeader)) {
            throw new Exception("Authorization header is missing");
        }
        String dateHeader = request.getHeader("Date");
        if (StringUtils.isBlank(dateHeader)) {
            dateHeader = request.getHeader("X-AB-Date");
            if (StringUtils.isBlank(dateHeader)) {
                throw new Exception("Date header is missing");
            }
        }
        boolean isValid = aresBridgeApi.validateTicket(dateHeader, authorizationHeader, request.getRequestURI());
        if (!isValid) {
            throw new Exception("Ticket is not valid");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        response.getWriter().write("AresBridgeCallbackServlet is running");
    }
}