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
 * <p>CreateSignatoryRequest.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 * <p>
 * CreateSignatoryRequest.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 */
/**
 * CreateSignatoryRequest.java
 *
 * <p>This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT)
 * WSDL2Java emitter.
 */
package eu.cec.digit.circabc.repo.hrs.ws;

/** Request for creating a document signatory. */
public class CreateSignatoryRequest implements java.io.Serializable {

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
            new org.apache.axis.description.TypeDesc(CreateSignatoryRequest.class, true);

    static {
        typeDesc.setXmlType(
                new javax.xml.namespace.QName(
                        "http://ec.europa.eu/sg/hrs/types", "CreateSignatoryRequest"));
        org.apache.axis.description.ElementDesc elemField =
                new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("documentId");
        elemField.setXmlName(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "documentId"));
        elemField.setXmlType(
                new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("signatoryType");
        elemField.setXmlName(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "signatoryType"));
        elemField.setXmlType(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "SignatoryType"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("managerId");
        elemField.setXmlName(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "managerId"));
        elemField.setXmlType(
                new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tasks");
        elemField.setXmlName(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "tasks"));
        elemField.setXmlType(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "SignatoryTaskToAdd"));
        elemField.setNillable(false);
        elemField.setItemQName(
                new javax.xml.namespace.QName("http://ec.europa.eu/sg/hrs/types", "task"));
        typeDesc.addFieldDesc(elemField);
    }

    /* The document for which the signatory is created */
    private java.lang.String documentId;
    /* Type of signatory workflow: paper or eSignatory */
    private eu.cec.digit.circabc.repo.hrs.ws.SignatoryType signatoryType;
    /* The manager of the signatory, which has to be an internal person
     * (i.e. organizations and external entities are not valid workflow managers).
     * This person can perform special actions on the signatory (for now
     * only
     *                         from Ares), like 'Bypass e-Signatory'. */
    private java.lang.String managerId;
    /* List of signatory tasks to be added to the document's signatory
     * workflow. More tasks can be added later if needed, but at least one
     * task
     *                         is needed at creation time. */
    private eu.cec.digit.circabc.repo.hrs.ws.SignatoryTaskToAdd[] tasks;
    private java.lang.Object __equalsCalc = null;
    private boolean __hashCodeCalc = false;

    public CreateSignatoryRequest() {
    }

    public CreateSignatoryRequest(
            java.lang.String documentId,
            eu.cec.digit.circabc.repo.hrs.ws.SignatoryType signatoryType,
            java.lang.String managerId,
            eu.cec.digit.circabc.repo.hrs.ws.SignatoryTaskToAdd[] tasks) {
        this.documentId = documentId;
        this.signatoryType = signatoryType;
        this.managerId = managerId;
        this.tasks = tasks;
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
     * Gets the documentId value for this CreateSignatoryRequest.
     *
     * @return documentId * The document for which the signatory is created
     */
    public java.lang.String getDocumentId() {
        return documentId;
    }

    /**
     * Sets the documentId value for this CreateSignatoryRequest.
     *
     * @param documentId * The document for which the signatory is created
     */
    public void setDocumentId(java.lang.String documentId) {
        this.documentId = documentId;
    }

    /**
     * Gets the signatoryType value for this CreateSignatoryRequest.
     *
     * @return signatoryType * Type of signatory workflow: paper or eSignatory
     */
    public eu.cec.digit.circabc.repo.hrs.ws.SignatoryType getSignatoryType() {
        return signatoryType;
    }

    /**
     * Sets the signatoryType value for this CreateSignatoryRequest.
     *
     * @param signatoryType * Type of signatory workflow: paper or eSignatory
     */
    public void setSignatoryType(eu.cec.digit.circabc.repo.hrs.ws.SignatoryType signatoryType) {
        this.signatoryType = signatoryType;
    }

    /**
     * Gets the managerId value for this CreateSignatoryRequest.
     *
     * @return managerId * The manager of the signatory, which has to be an internal person (i.e.
     *     organizations and external entities are not valid workflow managers). This person can
     *     perform special actions on the signatory (for now only from Ares), like 'Bypass
     *     e-Signatory'.
     */
    public java.lang.String getManagerId() {
        return managerId;
    }

    /**
     * Sets the managerId value for this CreateSignatoryRequest.
     *
     * @param managerId * The manager of the signatory, which has to be an internal person (i.e.
     *     organizations and external entities are not valid workflow managers). This person can
     *     perform special actions on the signatory (for now only from Ares), like 'Bypass
     *     e-Signatory'.
     */
    public void setManagerId(java.lang.String managerId) {
        this.managerId = managerId;
    }

    /**
     * Gets the tasks value for this CreateSignatoryRequest.
     *
     * @return tasks * List of signatory tasks to be added to the document's signatory workflow. More
     *     tasks can be added later if needed, but at least one task is needed at creation time.
     */
    public eu.cec.digit.circabc.repo.hrs.ws.SignatoryTaskToAdd[] getTasks() {
        return tasks;
    }

    /**
     * Sets the tasks value for this CreateSignatoryRequest.
     *
     * @param tasks * List of signatory tasks to be added to the document's signatory workflow. More
     *     tasks can be added later if needed, but at least one task is needed at creation time.
     */
    public void setTasks(eu.cec.digit.circabc.repo.hrs.ws.SignatoryTaskToAdd[] tasks) {
        this.tasks = tasks;
    }

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof CreateSignatoryRequest)) {
            return false;
        }
        CreateSignatoryRequest other = (CreateSignatoryRequest) obj;
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
                        && ((this.documentId == null && other.getDocumentId() == null)
                        || (this.documentId != null && this.documentId.equals(other.getDocumentId())))
                        && ((this.signatoryType == null && other.getSignatoryType() == null)
                        || (this.signatoryType != null
                        && this.signatoryType.equals(other.getSignatoryType())))
                        && ((this.managerId == null && other.getManagerId() == null)
                        || (this.managerId != null && this.managerId.equals(other.getManagerId())))
                        && ((this.tasks == null && other.getTasks() == null)
                        || (this.tasks != null && java.util.Arrays.equals(this.tasks, other.getTasks())));
        __equalsCalc = null;
        return _equals;
    }

    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getDocumentId() != null) {
            _hashCode += getDocumentId().hashCode();
        }
        if (getSignatoryType() != null) {
            _hashCode += getSignatoryType().hashCode();
        }
        if (getManagerId() != null) {
            _hashCode += getManagerId().hashCode();
        }
        if (getTasks() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getTasks()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getTasks(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }
}
