//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import eu.cec.digit.circabc.migration.entities.XMLElement;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence maxOccurs="unbounded" minOccurs="0">
 *         &lt;element ref="{https://circabc.europa.eu/Import/ImportSchema/1.0}logEntry"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "logEntries"
})
@XmlRootElement(name = "logFile")
public class LogFile
    extends XMLElement
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElement(name = "logEntry")
    protected List<LogEntry> logEntries;

    /**
     * Default no-arg constructor
     * 
     */
    public LogFile() {
        super();
    }

    /**
     * Fully-initialising value constructor
     * 
     */
    public LogFile(final List<LogEntry> logEntries) {
        super();
        this.logEntries = logEntries;
    }

    /**
     * Gets the value of the logEntries property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the logEntries property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLogEntries().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link LogEntry }
     * 
     * 
     */
    public List<LogEntry> getLogEntries() {
        if (logEntries == null) {
            logEntries = new ArrayList<LogEntry>();
        }
        return this.logEntries;
    }

    public LogFile withLogEntries(LogEntry... values) {
        if (values!= null) {
            for (LogEntry value: values) {
                getLogEntries().add(value);
            }
        }
        return this;
    }

    public LogFile withLogEntries(Collection<LogEntry> values) {
        if (values!= null) {
            getLogEntries().addAll(values);
        }
        return this;
    }

}
