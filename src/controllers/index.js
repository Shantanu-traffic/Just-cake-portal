import IndexServiceObj from "../services";

class IndexController{
    async serverHealth(req,res) {
        return res.send(IndexServiceObj.healthCheck());
    }
}

const IndexControllerObj = new IndexController();
export default IndexControllerObj;