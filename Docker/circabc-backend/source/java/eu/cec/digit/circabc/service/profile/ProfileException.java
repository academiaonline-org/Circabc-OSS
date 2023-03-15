/**
 * ***************************************************************************** Copyright 2006
 * European Community
 *
 * <p>Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the European
 * Commission - subsequent versions of the EUPL (the "Licence"); You may not use this work except in
 * compliance with the Licence. You may obtain a copy of the Licence at:
 *
 * <p>https://joinup.ec.europa.eu/software/page/eupl
 *
 * <p>Unless required by applicable law or agreed to in writing, software distributed under the
 * Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 * ****************************************************************************
 */
package eu.cec.digit.circabc.service.profile;

/**
 * Exception used by the ProfileManagerService
 *
 * @author Clinckart Stephane
 */
public class ProfileException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 9088824582171521166L;

    String profileName;

    String explanation;

    public ProfileException(String profileName, String explain) {
        super(profileName + ": " + explain);

        this.profileName = profileName;
        this.explanation = explain;
    }

    public String getProfileName() {
        return profileName;
    }

    public String getExplanation() {
        return explanation;
    }
}
