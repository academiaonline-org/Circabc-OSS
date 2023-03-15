/**
 * Copyright 2006 European Community
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
 *
 * <p>FindCurrentInternalEntityRequestSearchForOrganization.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 * <p>
 * FindCurrentInternalEntityRequestSearchForOrganization.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 */
/**
 * FindCurrentInternalEntityRequestSearchForOrganization.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 */
package eu.cec.digit.circabc.repo.hrs.ws;

public class FindCurrentInternalEntityRequestSearchForOrganization implements java.io.Serializable {

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
            new org.apache.axis.description.TypeDesc(
                    FindCurrentInternalEntityRequestSearchForOrganization.class, true);

    static {
        typeDesc.setXmlType(
                new javax.xml.namespace.QName(
                        "http://ec.europa.eu/sg/hrs/types",
                        ">FindCurrentInternalEntityRequest>searchForOrganization"));
        org.apache.axis.description.ElementDesc elemField =
                new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("name");
        elemField.setXmlName(new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "name"));
        elemField.setXmlType(
                new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /* Code of the internal organization (e.g. DIGIT.B.1) */
    private java.lang.String name;
    private java.lang.Object __equalsCalc = null;
    private boolean __hashCodeCalc = false;

    public FindCurrentInternalEntityRequestSearchForOrganization() {
    }

    public FindCurrentInternalEntityRequestSearchForOrganization(java.lang.String name) {
        this.name = name;
    }

    /** Return type metadata object */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /** Get Custom Serializer */
    public static org.apache.axis.encoding.Serializer getSerializer(
            java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
    }

    /** Get Custom Deserializer */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
            java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Gets the name value for this FindCurrentInternalEntityRequestSearchForOrganization.
     *
     * @return name * Code of the internal organization (e.g. DIGIT.B.1)
     */
    public java.lang.String getName() {
        return name;
    }

    /**
     * Sets the name value for this FindCurrentInternalEntityRequestSearchForOrganization.
     *
     * @param name * Code of the internal organization (e.g. DIGIT.B.1)
     */
    public void setName(java.lang.String name) {
        this.name = name;
    }

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof FindCurrentInternalEntityRequestSearchForOrganization)) {
            return false;
        }
        FindCurrentInternalEntityRequestSearchForOrganization other =
                (FindCurrentInternalEntityRequestSearchForOrganization) obj;
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals =
                true
                        && ((this.name == null && other.getName() == null)
                        || (this.name != null && this.name.equals(other.getName())));
        __equalsCalc = null;
        return _equals;
    }

    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getName() != null) {
            _hashCode += getName().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }
}
