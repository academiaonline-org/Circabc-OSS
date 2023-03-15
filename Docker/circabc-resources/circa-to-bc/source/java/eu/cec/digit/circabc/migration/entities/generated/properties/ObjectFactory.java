//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated.properties;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.namespace.QName;

import eu.cec.digit.circabc.migration.entities.TypedProperty.ExpirationDateProperty;
import eu.cec.digit.circabc.migration.entities.TypedProperty.URLProperty;
import eu.cec.digit.circabc.migration.entities.TypedProperty.VersionLabelProperty;
import eu.cec.digit.circabc.migration.entities.TypedProperty.VersionNoteProperty;
import eu.cec.digit.circabc.migration.entities.adapter.ExpirationDatePropertyAdapter;
import eu.cec.digit.circabc.migration.entities.adapter.URLPropertyAdapter;
import eu.cec.digit.circabc.migration.entities.adapter.VersionLabelPropertyAdapter;
import eu.cec.digit.circabc.migration.entities.adapter.VersionNotePropertyAdapter;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the eu.cec.digit.circabc.migration.entities.generated.properties package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _ExpirationDate_QNAME = new QName("https://circabc.europa.eu/Import/PropertiesSchema/1.0", "expirationDate");
    private final static QName _Target_QNAME = new QName("https://circabc.europa.eu/Import/PropertiesSchema/1.0", "target");
    private final static QName _VersionNote_QNAME = new QName("https://circabc.europa.eu/Import/PropertiesSchema/1.0", "versionNote");
    private final static QName _VersionLabel_QNAME = new QName("https://circabc.europa.eu/Import/PropertiesSchema/1.0", "versionLabel");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: eu.cec.digit.circabc.migration.entities.generated.properties
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ExtendedProperty }
     * 
     */
    public ExtendedProperty createExtendedProperty() {
        return new ExtendedProperty();
    }

    /**
     * Create an instance of {@link Shared }
     * 
     */
    public Shared createShared() {
        return new Shared();
    }

    /**
     * Create an instance of {@link ModerationRefused }
     * 
     */
    public ModerationRefused createModerationRefused() {
        return new ModerationRefused();
    }

    /**
     * Create an instance of {@link DynamicPropertyDefinition }
     * 
     */
    public DynamicPropertyDefinition createDynamicPropertyDefinition() {
        return new DynamicPropertyDefinition();
    }

    /**
     * Create an instance of {@link DynamicPropertyDefinitions }
     * 
     */
    public DynamicPropertyDefinitions createDynamicPropertyDefinitions() {
        return new DynamicPropertyDefinitions();
    }

    /**
     * Create an instance of {@link MeetingRequestStatus }
     * 
     */
    public MeetingRequestStatus createMeetingRequestStatus() {
        return new MeetingRequestStatus();
    }

    /**
     * Create an instance of {@link EveryTimesOccurence }
     * 
     */
    public EveryTimesOccurence createEveryTimesOccurence() {
        return new EveryTimesOccurence();
    }

    /**
     * Create an instance of {@link ContactInformation }
     * 
     */
    public ContactInformation createContactInformation() {
        return new ContactInformation();
    }

    /**
     * Create an instance of {@link I18NProperty }
     * 
     */
    public I18NProperty createI18NProperty() {
        return new I18NProperty();
    }

    /**
     * Create an instance of {@link AudienceClosed }
     * 
     */
    public AudienceClosed createAudienceClosed() {
        return new AudienceClosed();
    }

    /**
     * Create an instance of {@link SingleDate }
     * 
     */
    public SingleDate createSingleDate() {
        return new SingleDate();
    }

    /**
     * Create an instance of {@link ModerationAccepted }
     * 
     */
    public ModerationAccepted createModerationAccepted() {
        return new ModerationAccepted();
    }

    /**
     * Create an instance of {@link TimesOccurence }
     * 
     */
    public TimesOccurence createTimesOccurence() {
        return new TimesOccurence();
    }

    /**
     * Create an instance of {@link KeywordReferences }
     * 
     */
    public KeywordReferences createKeywordReferences() {
        return new KeywordReferences();
    }

    /**
     * Create an instance of {@link KeywordDefinitions }
     * 
     */
    public KeywordDefinitions createKeywordDefinitions() {
        return new KeywordDefinitions();
    }

    /**
     * Create an instance of {@link KeywordDefinition }
     * 
     */
    public KeywordDefinition createKeywordDefinition() {
        return new KeywordDefinition();
    }

    /**
     * Create an instance of {@link AudienceOpen }
     * 
     */
    public AudienceOpen createAudienceOpen() {
        return new AudienceOpen();
    }

    /**
     * Create an instance of {@link ModerationPending }
     * 
     */
    public ModerationPending createModerationPending() {
        return new ModerationPending();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ExpirationDateProperty }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", name = "expirationDate")
    @XmlJavaTypeAdapter(ExpirationDatePropertyAdapter.class)
    public JAXBElement<ExpirationDateProperty> createExpirationDate(ExpirationDateProperty value) {
        return new JAXBElement<ExpirationDateProperty>(_ExpirationDate_QNAME, ExpirationDateProperty.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link URLProperty }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", name = "target")
    @XmlJavaTypeAdapter(URLPropertyAdapter.class)
    public JAXBElement<URLProperty> createTarget(URLProperty value) {
        return new JAXBElement<URLProperty>(_Target_QNAME, URLProperty.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link VersionNoteProperty }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", name = "versionNote")
    @XmlJavaTypeAdapter(VersionNotePropertyAdapter.class)
    public JAXBElement<VersionNoteProperty> createVersionNote(VersionNoteProperty value) {
        return new JAXBElement<VersionNoteProperty>(_VersionNote_QNAME, VersionNoteProperty.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link VersionLabelProperty }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", name = "versionLabel")
    @XmlJavaTypeAdapter(VersionLabelPropertyAdapter.class)
    public JAXBElement<VersionLabelProperty> createVersionLabel(VersionLabelProperty value) {
        return new JAXBElement<VersionLabelProperty>(_VersionLabel_QNAME, VersionLabelProperty.class, null, value);
    }

}
