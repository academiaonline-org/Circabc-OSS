//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated.properties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import eu.cec.digit.circabc.migration.entities.XMLElement;
import eu.cec.digit.circabc.migration.entities.adapter.IntegerAdapter;


/**
 * <p>Java class for dynamicPropertyDefinition complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="dynamicPropertyDefinition">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="type" type="{https://circabc.europa.eu/Import/PropertiesSchema/1.0}dynPropertyType"/>
 *         &lt;choice>
 *           &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *           &lt;element name="I18NValue" type="{https://circabc.europa.eu/Import/PropertiesSchema/1.0}I18NProperty" maxOccurs="unbounded"/>
 *         &lt;/choice>
 *         &lt;element name="selectionCase" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="id" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}integer">
 *             &lt;pattern value="1|2|3|4|5"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "dynamicPropertyDefinition", propOrder = {
    "type",
    "i18NValues",
    "value",
    "selectionCases"
})
public class DynamicPropertyDefinition
    extends XMLElement
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElement(required = true)
    protected DynPropertyType type;
    @XmlElement(name = "I18NValue")
    protected List<I18NProperty> i18NValues;
    protected String value;
    @XmlElement(name = "selectionCase")
    protected List<String> selectionCases;
    @XmlAttribute(required = true)
    @XmlJavaTypeAdapter(IntegerAdapter.class)
    protected Integer id;

    /**
     * Default no-arg constructor
     * 
     */
    public DynamicPropertyDefinition() {
        super();
    }

    /**
     * Fully-initialising value constructor
     * 
     */
    public DynamicPropertyDefinition(final DynPropertyType type, final List<I18NProperty> i18NValues, final String value, final List<String> selectionCases, final Integer id) {
        super();
        this.type = type;
        this.i18NValues = i18NValues;
        this.value = value;
        this.selectionCases = selectionCases;
        this.id = id;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link DynPropertyType }
     *     
     */
    public DynPropertyType getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link DynPropertyType }
     *     
     */
    public void setType(DynPropertyType value) {
        this.type = value;
    }

    /**
     * Gets the value of the i18NValues property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the i18NValues property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getI18NValues().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link I18NProperty }
     * 
     * 
     */
    public List<I18NProperty> getI18NValues() {
        if (i18NValues == null) {
            i18NValues = new ArrayList<I18NProperty>();
        }
        return this.i18NValues;
    }

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the selectionCases property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the selectionCases property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSelectionCases().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getSelectionCases() {
        if (selectionCases == null) {
            selectionCases = new ArrayList<String>();
        }
        return this.selectionCases;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(Integer value) {
        this.id = value;
    }

    public DynamicPropertyDefinition withType(DynPropertyType value) {
        setType(value);
        return this;
    }

    public DynamicPropertyDefinition withI18NValues(I18NProperty... values) {
        if (values!= null) {
            for (I18NProperty value: values) {
                getI18NValues().add(value);
            }
        }
        return this;
    }

    public DynamicPropertyDefinition withI18NValues(Collection<I18NProperty> values) {
        if (values!= null) {
            getI18NValues().addAll(values);
        }
        return this;
    }

    public DynamicPropertyDefinition withValue(String value) {
        setValue(value);
        return this;
    }

    public DynamicPropertyDefinition withSelectionCases(String... values) {
        if (values!= null) {
            for (String value: values) {
                getSelectionCases().add(value);
            }
        }
        return this;
    }

    public DynamicPropertyDefinition withSelectionCases(Collection<String> values) {
        if (values!= null) {
            getSelectionCases().addAll(values);
        }
        return this;
    }

    public DynamicPropertyDefinition withId(Integer value) {
        setId(value);
        return this;
    }

}
