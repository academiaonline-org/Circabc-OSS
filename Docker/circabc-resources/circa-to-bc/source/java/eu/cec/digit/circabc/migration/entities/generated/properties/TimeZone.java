//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-558 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.01.17 at 12:50:48 PM GMT 
//


package eu.cec.digit.circabc.migration.entities.generated.properties;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for timeZone.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="timeZone">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="GMT-12"/>
 *     &lt;enumeration value="GMT-11"/>
 *     &lt;enumeration value="GMT-10"/>
 *     &lt;enumeration value="GMT-9"/>
 *     &lt;enumeration value="GMT-8"/>
 *     &lt;enumeration value="GMT-7"/>
 *     &lt;enumeration value="GMT-6"/>
 *     &lt;enumeration value="GMT-5"/>
 *     &lt;enumeration value="GMT-4"/>
 *     &lt;enumeration value="GMT-3"/>
 *     &lt;enumeration value="GMT-2"/>
 *     &lt;enumeration value="GMT-1"/>
 *     &lt;enumeration value="GMT"/>
 *     &lt;enumeration value="GMT+1"/>
 *     &lt;enumeration value="GMT+2"/>
 *     &lt;enumeration value="GMT+3"/>
 *     &lt;enumeration value="GMT+4"/>
 *     &lt;enumeration value="GMT+5"/>
 *     &lt;enumeration value="GMT+6"/>
 *     &lt;enumeration value="GMT+7"/>
 *     &lt;enumeration value="GMT+8"/>
 *     &lt;enumeration value="GMT+9"/>
 *     &lt;enumeration value="GMT+10"/>
 *     &lt;enumeration value="GMT+11"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "timeZone")
@XmlEnum
public enum TimeZone {

    @XmlEnumValue("GMT-12")
    VALUE_1("GMT-12"),
    @XmlEnumValue("GMT-11")
    VALUE_2("GMT-11"),
    @XmlEnumValue("GMT-10")
    VALUE_3("GMT-10"),
    @XmlEnumValue("GMT-9")
    VALUE_4("GMT-9"),
    @XmlEnumValue("GMT-8")
    VALUE_5("GMT-8"),
    @XmlEnumValue("GMT-7")
    VALUE_6("GMT-7"),
    @XmlEnumValue("GMT-6")
    VALUE_7("GMT-6"),
    @XmlEnumValue("GMT-5")
    VALUE_8("GMT-5"),
    @XmlEnumValue("GMT-4")
    VALUE_9("GMT-4"),
    @XmlEnumValue("GMT-3")
    VALUE_10("GMT-3"),
    @XmlEnumValue("GMT-2")
    VALUE_11("GMT-2"),
    @XmlEnumValue("GMT-1")
    VALUE_12("GMT-1"),
    @XmlEnumValue("GMT")
    VALUE_13("GMT"),
    @XmlEnumValue("GMT+1")
    VALUE_14("GMT+1"),
    @XmlEnumValue("GMT+2")
    VALUE_15("GMT+2"),
    @XmlEnumValue("GMT+3")
    VALUE_16("GMT+3"),
    @XmlEnumValue("GMT+4")
    VALUE_17("GMT+4"),
    @XmlEnumValue("GMT+5")
    VALUE_18("GMT+5"),
    @XmlEnumValue("GMT+6")
    VALUE_19("GMT+6"),
    @XmlEnumValue("GMT+7")
    VALUE_20("GMT+7"),
    @XmlEnumValue("GMT+8")
    VALUE_21("GMT+8"),
    @XmlEnumValue("GMT+9")
    VALUE_22("GMT+9"),
    @XmlEnumValue("GMT+10")
    VALUE_23("GMT+10"),
    @XmlEnumValue("GMT+11")
    VALUE_24("GMT+11");
    private final String value;

    TimeZone(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static TimeZone fromValue(String v) {
        for (TimeZone c: TimeZone.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
