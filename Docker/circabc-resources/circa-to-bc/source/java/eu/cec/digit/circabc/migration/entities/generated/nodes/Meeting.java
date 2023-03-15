//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated.nodes;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import eu.cec.digit.circabc.migration.entities.generated.properties.AudienceClosed;
import eu.cec.digit.circabc.migration.entities.generated.properties.AudienceOpen;
import eu.cec.digit.circabc.migration.entities.generated.properties.Availability;
import eu.cec.digit.circabc.migration.entities.generated.properties.ContactInformation;
import eu.cec.digit.circabc.migration.entities.generated.properties.EveryTimesOccurence;
import eu.cec.digit.circabc.migration.entities.generated.properties.MeetingRequestStatus;
import eu.cec.digit.circabc.migration.entities.generated.properties.MeetingType;
import eu.cec.digit.circabc.migration.entities.generated.properties.SingleDate;
import eu.cec.digit.circabc.migration.entities.generated.properties.TimeZone;
import eu.cec.digit.circabc.migration.entities.generated.properties.TimesOccurence;


/**
 * <p>Java class for meeting complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="meeting">
 *   &lt;complexContent>
 *     &lt;extension base="{https://circabc.europa.eu/Import/NodesSchema/1.0}appointment">
 *       &lt;sequence>
 *         &lt;group ref="{https://circabc.europa.eu/Import/PropertiesSchema/1.0}meetingProperties"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "meeting", propOrder = {
    "type",
    "availability",
    "organization",
    "agenda",
    "librarySection",
    "meetingRequestStatuses"
})
@XmlRootElement(name = "meeting")
public class Meeting
    extends Appointment
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", defaultValue = "FaceToFace")
    protected MeetingType type;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0", defaultValue = "Private")
    protected Availability availability;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0")
    protected String organization;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0")
    protected String agenda;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0")
    protected String librarySection;
    @XmlElement(name = "meetingRequestStatus", namespace = "https://circabc.europa.eu/Import/PropertiesSchema/1.0")
    protected List<MeetingRequestStatus> meetingRequestStatuses;

    /**
     * Default no-arg constructor
     * 
     */
    public Meeting() {
        super();
    }

    /**
     * Fully-initialising value constructor
     * 
     */
    public Meeting(final String appointmentTitle, final Locale language, final String _abstract, final Date date, final Date startDate, final Date startTime, final Date endTime, final EveryTimesOccurence everyTimesOccurence, final TimesOccurence timesOccurence, final SingleDate singleDate, final TimeZone timeZoneId, final String location, final AudienceClosed audienceClosed, final AudienceOpen audienceOpen, final ContactInformation contact, final MeetingType type, final Availability availability, final String organization, final String agenda, final String librarySection, final List<MeetingRequestStatus> meetingRequestStatuses) {
        super(appointmentTitle, language, _abstract, date, startDate, startTime, endTime, everyTimesOccurence, timesOccurence, singleDate, timeZoneId, location, audienceClosed, audienceOpen, contact);
        this.type = type;
        this.availability = availability;
        this.organization = organization;
        this.agenda = agenda;
        this.librarySection = librarySection;
        this.meetingRequestStatuses = meetingRequestStatuses;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link MeetingType }
     *     
     */
    public MeetingType getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link MeetingType }
     *     
     */
    public void setType(MeetingType value) {
        this.type = value;
    }

    /**
     * Gets the value of the availability property.
     * 
     * @return
     *     possible object is
     *     {@link Availability }
     *     
     */
    public Availability getAvailability() {
        return availability;
    }

    /**
     * Sets the value of the availability property.
     * 
     * @param value
     *     allowed object is
     *     {@link Availability }
     *     
     */
    public void setAvailability(Availability value) {
        this.availability = value;
    }

    /**
     * Gets the value of the organization property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrganization() {
        return organization;
    }

    /**
     * Sets the value of the organization property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrganization(String value) {
        this.organization = value;
    }

    /**
     * Gets the value of the agenda property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAgenda() {
        return agenda;
    }

    /**
     * Sets the value of the agenda property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAgenda(String value) {
        this.agenda = value;
    }

    /**
     * Gets the value of the librarySection property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLibrarySection() {
        return librarySection;
    }

    /**
     * Sets the value of the librarySection property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLibrarySection(String value) {
        this.librarySection = value;
    }

    /**
     * Gets the value of the meetingRequestStatuses property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the meetingRequestStatuses property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMeetingRequestStatuses().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MeetingRequestStatus }
     * 
     * 
     */
    public List<MeetingRequestStatus> getMeetingRequestStatuses() {
        if (meetingRequestStatuses == null) {
            meetingRequestStatuses = new ArrayList<MeetingRequestStatus>();
        }
        return this.meetingRequestStatuses;
    }

    public Meeting withType(MeetingType value) {
        setType(value);
        return this;
    }

    public Meeting withAvailability(Availability value) {
        setAvailability(value);
        return this;
    }

    public Meeting withOrganization(String value) {
        setOrganization(value);
        return this;
    }

    public Meeting withAgenda(String value) {
        setAgenda(value);
        return this;
    }

    public Meeting withLibrarySection(String value) {
        setLibrarySection(value);
        return this;
    }

    public Meeting withMeetingRequestStatuses(MeetingRequestStatus... values) {
        if (values!= null) {
            for (MeetingRequestStatus value: values) {
                getMeetingRequestStatuses().add(value);
            }
        }
        return this;
    }

    public Meeting withMeetingRequestStatuses(Collection<MeetingRequestStatus> values) {
        if (values!= null) {
            getMeetingRequestStatuses().addAll(values);
        }
        return this;
    }

    @Override
    public Meeting withAppointmentTitle(String value) {
        setAppointmentTitle(value);
        return this;
    }

    @Override
    public Meeting withLanguage(Locale value) {
        setLanguage(value);
        return this;
    }

    @Override
    public Meeting withAbstract(String value) {
        setAbstract(value);
        return this;
    }

    @Override
    public Meeting withDate(Date value) {
        setDate(value);
        return this;
    }

    @Override
    public Meeting withStartDate(Date value) {
        setStartDate(value);
        return this;
    }

    @Override
    public Meeting withStartTime(Date value) {
        setStartTime(value);
        return this;
    }

    @Override
    public Meeting withEndTime(Date value) {
        setEndTime(value);
        return this;
    }

    @Override
    public Meeting withEveryTimesOccurence(EveryTimesOccurence value) {
        setEveryTimesOccurence(value);
        return this;
    }

    @Override
    public Meeting withTimesOccurence(TimesOccurence value) {
        setTimesOccurence(value);
        return this;
    }

    @Override
    public Meeting withSingleDate(SingleDate value) {
        setSingleDate(value);
        return this;
    }

    @Override
    public Meeting withTimeZoneId(TimeZone value) {
        setTimeZoneId(value);
        return this;
    }

    @Override
    public Meeting withLocation(String value) {
        setLocation(value);
        return this;
    }

    @Override
    public Meeting withAudienceClosed(AudienceClosed value) {
        setAudienceClosed(value);
        return this;
    }

    @Override
    public Meeting withAudienceOpen(AudienceOpen value) {
        setAudienceOpen(value);
        return this;
    }

    @Override
    public Meeting withContact(ContactInformation value) {
        setContact(value);
        return this;
    }

}
