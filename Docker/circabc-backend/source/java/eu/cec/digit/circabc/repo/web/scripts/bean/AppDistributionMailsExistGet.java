package eu.cec.digit.circabc.repo.web.scripts.bean;

import io.swagger.api.AppMessageApi;
import io.swagger.util.CurrentUserPermissionCheckerService;
import org.alfresco.repo.security.permissions.AccessDeniedException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author beaurpi
 */
public class AppDistributionMailsExistGet extends DeclarativeWebScript {

    /**
     * A logger for the class
     */
    static final Log logger = LogFactory.getLog(AppDistributionMailsExistGet.class);

    private AppMessageApi appMessageApi;
    private CurrentUserPermissionCheckerService currentUserPermissionCheckerService;

    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {

        Map<String, Object> model = new HashMap<>(7, 1.0f);

        Map<String, String> var = req.getServiceMatch().getTemplateVars();

        try {
            if (!(currentUserPermissionCheckerService.isAlfrescoAdmin()
                    || currentUserPermissionCheckerService.isCircabcAdmin()
                    || currentUserPermissionCheckerService.isCurrentUserEqualTo(var.get("userId")))) {
                throw new AccessDeniedException("");
            }

            model.put("email", appMessageApi.getSubscribedDistributionEmail(var.get("userId")));

        } catch (AccessDeniedException ade) {
            status.setCode(HttpServletResponse.SC_FORBIDDEN);
            status.setMessage("Access denied");
            status.setRedirect(true);
            return null;
        }

        return model;
    }

    /**
     * @return the appMessageApi
     */
    public AppMessageApi getAppMessageApi() {
        return appMessageApi;
    }

    /**
     * @param appMessageApi the appMessageApi to set
     */
    public void setAppMessageApi(AppMessageApi appMessageApi) {
        this.appMessageApi = appMessageApi;
    }

    /**
     * @return the currentUserPermissionCheckerService
     */
    public CurrentUserPermissionCheckerService getCurrentUserPermissionCheckerService() {
        return currentUserPermissionCheckerService;
    }

    /**
     * @param currentUserPermissionCheckerService the currentUserPermissionCheckerService to set
     */
    public void setCurrentUserPermissionCheckerService(
            CurrentUserPermissionCheckerService currentUserPermissionCheckerService) {
        this.currentUserPermissionCheckerService = currentUserPermissionCheckerService;
    }
}
