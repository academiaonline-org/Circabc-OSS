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
package eu.cec.digit.circabc.service.bulk.validation;

import eu.cec.digit.circabc.service.bulk.indexes.IndexEntry;
import eu.cec.digit.circabc.service.bulk.indexes.IndexRecord;
import eu.cec.digit.circabc.service.bulk.indexes.message.ValidationMessage;

import java.util.ArrayList;
import java.util.List;

public class ValidationImpl implements Validation {

    public List<ValidationMessage> validate(final List<IndexRecord> indexRecords) {
        final List<ValidationMessage> validationMessages = new ArrayList<>();
        return validationMessages;
    }

    public List<ValidationMessage> validate(final IndexRecord indexRecord) {
        final List<ValidationMessage> validationMessages = new ArrayList<>();
        return validationMessages;
    }

    public List<ValidationMessage> validate(final IndexEntry indexEntry) {
        final List<ValidationMessage> validationMessages = new ArrayList<>();

        return validationMessages;
    }
}
