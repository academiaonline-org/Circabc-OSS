//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import eu.cec.digit.circabc.migration.entities.XMLElement;
import eu.cec.digit.circabc.migration.entities.generated.nodes.Circabc;
import eu.cec.digit.circabc.migration.entities.generated.user.Persons;


/**
 * <p>Java class for importRoot complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="importRoot">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{https://circabc.europa.eu/Import/NodesSchema/1.0}circabc" minOccurs="0"/>
 *         &lt;element ref="{https://circabc.europa.eu/Import/UsersSchema/1.0}persons" minOccurs="0"/>
 *         &lt;element ref="{https://circabc.europa.eu/Import/ImportSchema/1.0}logFile" minOccurs="0"/>
 *         &lt;element ref="{https://circabc.europa.eu/Import/ImportSchema/1.0}versionHistory" minOccurs="0"/>
 *         &lt;element ref="{https://circabc.europa.eu/Import/ImportSchema/1.0}statistics" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "importRoot", propOrder = {
    "circabc",
    "persons",
    "logFile",
    "versionHistory",
    "statistics"
})
@XmlRootElement(name = "importRoot")
public class ImportRoot
    extends XMLElement
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/NodesSchema/1.0")
    protected Circabc circabc;
    @XmlElement(namespace = "https://circabc.europa.eu/Import/UsersSchema/1.0")
    protected Persons persons;
    protected LogFile logFile;
    protected VersionHistory versionHistory;
    protected Statistics statistics;

    /**
     * Default no-arg constructor
     * 
     */
    public ImportRoot() {
        super();
    }

    /**
     * Fully-initialising value constructor
     * 
     */
    public ImportRoot(final Circabc circabc, final Persons persons, final LogFile logFile, final VersionHistory versionHistory, final Statistics statistics) {
        super();
        this.circabc = circabc;
        this.persons = persons;
        this.logFile = logFile;
        this.versionHistory = versionHistory;
        this.statistics = statistics;
    }

    /**
     * Gets the value of the circabc property.
     * 
     * @return
     *     possible object is
     *     {@link Circabc }
     *     
     */
    public Circabc getCircabc() {
        return circabc;
    }

    /**
     * Sets the value of the circabc property.
     * 
     * @param value
     *     allowed object is
     *     {@link Circabc }
     *     
     */
    public void setCircabc(Circabc value) {
        this.circabc = value;
    }

    /**
     * Gets the value of the persons property.
     * 
     * @return
     *     possible object is
     *     {@link Persons }
     *     
     */
    public Persons getPersons() {
        return persons;
    }

    /**
     * Sets the value of the persons property.
     * 
     * @param value
     *     allowed object is
     *     {@link Persons }
     *     
     */
    public void setPersons(Persons value) {
        this.persons = value;
    }

    /**
     * Gets the value of the logFile property.
     * 
     * @return
     *     possible object is
     *     {@link LogFile }
     *     
     */
    public LogFile getLogFile() {
        return logFile;
    }

    /**
     * Sets the value of the logFile property.
     * 
     * @param value
     *     allowed object is
     *     {@link LogFile }
     *     
     */
    public void setLogFile(LogFile value) {
        this.logFile = value;
    }

    /**
     * Gets the value of the versionHistory property.
     * 
     * @return
     *     possible object is
     *     {@link VersionHistory }
     *     
     */
    public VersionHistory getVersionHistory() {
        return versionHistory;
    }

    /**
     * Sets the value of the versionHistory property.
     * 
     * @param value
     *     allowed object is
     *     {@link VersionHistory }
     *     
     */
    public void setVersionHistory(VersionHistory value) {
        this.versionHistory = value;
    }

    /**
     * Gets the value of the statistics property.
     * 
     * @return
     *     possible object is
     *     {@link Statistics }
     *     
     */
    public Statistics getStatistics() {
        return statistics;
    }

    /**
     * Sets the value of the statistics property.
     * 
     * @param value
     *     allowed object is
     *     {@link Statistics }
     *     
     */
    public void setStatistics(Statistics value) {
        this.statistics = value;
    }

    public ImportRoot withCircabc(Circabc value) {
        setCircabc(value);
        return this;
    }

    public ImportRoot withPersons(Persons value) {
        setPersons(value);
        return this;
    }

    public ImportRoot withLogFile(LogFile value) {
        setLogFile(value);
        return this;
    }

    public ImportRoot withVersionHistory(VersionHistory value) {
        setVersionHistory(value);
        return this;
    }

    public ImportRoot withStatistics(Statistics value) {
        setStatistics(value);
        return this;
    }

}
