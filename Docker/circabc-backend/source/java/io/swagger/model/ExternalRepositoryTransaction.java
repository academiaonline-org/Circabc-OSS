package io.swagger.model;

public class ExternalRepositoryTransaction {
    private String repositoryId;
    private String transactionId;
    private String nodeId;
    private String versionLabel;

    public String getRepositoryId() {
        return repositoryId;
    }

    public void setRepositoryId(String repositoryId) {
        this.repositoryId = repositoryId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getVersionLabel() {
        return versionLabel;
    }

    public void setVersionLabel(String versionLabel) {
        this.versionLabel = versionLabel;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nodeId == null) ? 0 : nodeId.hashCode());
        result = prime * result + ((repositoryId == null) ? 0 : repositoryId.hashCode());
        result = prime * result + ((transactionId == null) ? 0 : transactionId.hashCode());
        result = prime * result + ((versionLabel == null) ? 0 : versionLabel.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        ExternalRepositoryTransaction other = (ExternalRepositoryTransaction) obj;
        if (nodeId == null) {
            if (other.nodeId != null) return false;
        } else if (!nodeId.equals(other.nodeId)) return false;
        if (repositoryId == null) {
            if (other.repositoryId != null) return false;
        } else if (!repositoryId.equals(other.repositoryId)) return false;
        if (transactionId == null) {
            if (other.transactionId != null) return false;
        } else if (!transactionId.equals(other.transactionId)) return false;
        if (versionLabel == null) {
            if (other.versionLabel != null) return false;
        } else if (!versionLabel.equals(other.versionLabel)) return false;
        return true;
    }
}
