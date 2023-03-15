/*--+
 |     Copyright European Community 2006 - Licensed under the EUPL V.1.0
 |
 |          http://ec.europa.eu/idabc/en/document/6523
 |
 +--*/

package eu.cec.digit.circabc.migration.entities.adapter;

import eu.cec.digit.circabc.migration.entities.TypedProperty;

/**
 * Adapt the Personal Information property.
 *
 * @author Yanick Pignot
 */

public class PersonalInformationPropertyAdapter extends PropertyAdapterBase
{

	@Override
	public TypedProperty unmarshal(String propertyStringValue) throws Exception
	{
		return new TypedProperty.PersonalInformationProperty(Boolean.valueOf(propertyStringValue));
	}

}
