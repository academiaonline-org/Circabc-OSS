package eu.cec.digit.circabc.repo.web.scripts.bean;

import io.swagger.api.CategoriesApi;
import io.swagger.util.CurrentUserPermissionCheckerService;
import org.alfresco.repo.node.MLPropertyInterceptor;
import org.alfresco.repo.security.permissions.AccessDeniedException;
import org.alfresco.service.cmr.repository.InvalidNodeRefException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.surf.util.I18NUtil;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.servlet.FormData;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class CategoryLogosPost extends CircabcDeclarativeWebScript {

    /**
     * A logger for the class
     */
    static final Log logger = LogFactory.getLog(CategoryLogosPost.class);

    private CategoriesApi categoriesApi;
    private CurrentUserPermissionCheckerService currentUserPermissionCheckerService;

    /**
     * @return the categoriesApi
     */
    public CategoriesApi getCategoriesApi() {
        return this.categoriesApi;
    }

    /**
     * @param categoriesApi the categoriesApi to set
     */
    public void setCategoriesApi(CategoriesApi categoriesApi) {
        this.categoriesApi = categoriesApi;
    }

    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<>(7, 1.0f);

        Map<String, String> templateVars = req.getServiceMatch().getTemplateVars();
        String categoryId = templateVars.get("id");

        String language = req.getParameter("language");
        boolean mlAware = MLPropertyInterceptor.isMLAware();

        if (language == null) {
            MLPropertyInterceptor.setMLAware(true);
        } else {
            Locale locale = new Locale(language);
            I18NUtil.setContentLocale(locale);
            I18NUtil.setLocale(locale);
            MLPropertyInterceptor.setMLAware(false);
        }
        try {
            if (!this.currentUserPermissionCheckerService.isCategoryAdmin(categoryId)) {
                throw new AccessDeniedException(
                        "Cannot get the list of all category logos, not enough permissions");
            }

            FormData form = (FormData) req.parseContent();

            if ((form == null) || !form.getIsMultiPart()) {
                throw new IllegalArgumentException("Not a multipart request.");
            }

            if (categoryId != null) {

                for (FormData.FormField field : form.getFields()) {
                    if (field.getIsFile()) {
                        InputStream inputStream = field.getInputStream();
                        this.categoriesApi.postCategoryLogoByCategoryId(
                                categoryId, inputStream, field.getFilename());
                        break;
                    }
                }

                model.put("logos", this.categoriesApi.getCategoryLogoByCategoryId(categoryId));
            } else {
                model.put("logos", null);
            }
        } catch (AccessDeniedException ade) {
            status.setCode(HttpServletResponse.SC_FORBIDDEN);
            status.setMessage("Access denied");
            status.setRedirect(true);
            return null;
        } catch (InvalidNodeRefException inre) {
            status.setCode(HttpServletResponse.SC_BAD_REQUEST);
            status.setMessage("Bad request");
            status.setRedirect(true);
            return null;
        } finally {
            MLPropertyInterceptor.setMLAware(mlAware);
        }
        return model;
    }

    public void setCurrentUserPermissionCheckerService(
            CurrentUserPermissionCheckerService currentUserPermissionCheckerService) {
        this.currentUserPermissionCheckerService = currentUserPermissionCheckerService;
    }
}
