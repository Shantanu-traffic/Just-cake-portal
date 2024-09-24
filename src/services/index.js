class IndexService{
    async healthCheck() {
        return "Okay!!"
    }
}

const IndexServiceObj = new IndexService();
export default IndexServiceObj;