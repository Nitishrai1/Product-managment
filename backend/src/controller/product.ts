import {prisma} from "../prisma/index"

import {ProductInfo} from "../utils/validateInput"

export const AllProducts=async(req:any,res:any)=>{

    try{
        const product=await prisma.product.findMany({});

        return res.status(200).json({msg:"all product",product:product});

    }catch(err){

        return res.status(500).json({msg:"Internal server error"});

    }
}


export const AddProduct=async(req:any,res:any)=>{
    const productdata:ProductInfo=req.body;

    try{
        const user_id=req.user?.user_id;
        if(!user_id){
            return res.status(401).json({msg:"unotherized access"})
        }
        console.log(`user_id is ${user_id}`);
        const response=await prisma.product.create({
            data: {
                productName: productdata.productName,
                price: typeof productdata.price === "string" ? parseFloat(productdata.price) : productdata.price,
                rating: typeof productdata.rating === "string" ? parseInt(productdata.rating, 10) : productdata.rating, 
                description: productdata.description, 
                category: productdata.category, 
                createdBy:user_id
              },
            select:{
                product_id:true,
            }
        })
        return res.status(201).json({msg:"product created succesfully",product_id:response.product_id});

    }catch(err){

        return res.status(500).json({msg:"internal server error",err});

    }
}


export const GetProduct=async(req:any,res:any)=>{

    const id=req.params.id;
    try{
        const response=await prisma.product.findUnique({
            where:{
                product_id:id
            }
        })
        if(!response){
            return res.status(404).json({msg:"product not found"});
        }
        return res.status(200).json({msg:"product found",product:response});

    }catch(err){
        return res.status(500).json({msg:"internal server error"});

    }
}


export const UpdateProduct=async(req:any,res:any)=>{

    const productdata:ProductInfo=req.body;
    const product_id=req.params.id;

    try{
        console.log(`product id in the backend ${product_id}`);
        console.log(`new product data in backend ${productdata}`);
        console.log(`prodcut name ${productdata.productName}`);

        const product=await prisma.product.findUnique({
            where:{
                product_id:product_id
            }
        })
        if(!product){
            return res.status(404).json({msg:"product not found"});
        }
        const updated = await prisma.product.update({
            where: {
              product_id: product_id, 
            },
            data: {
              productName: productdata.productName,
              price: typeof productdata.price === "string" ? parseFloat(productdata.price) : productdata.price, // Converting to float because i am getting the data as string from frontend
              rating: typeof productdata.rating === "string" ? parseInt(productdata.rating, 10) : productdata.rating, // Convert to integer if it's a string
              description: productdata.description, 
              category: productdata.category, 
            },
          });
          
        return res.status(200).json({msg:"product data updated successfull",updated})



    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"internal server error",err});

    }

}

export const DeleteProdcut=async(req:any,res:any)=>{
    const product_id=req.params.id;

    try{
        console.log("inside the deleter route")
        const product=await prisma.product.findUnique({
            where:{
                product_id:product_id
            }
        })
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        const response=await prisma.product.delete({
            where:{
                product_id:product_id
            }
        })
        return res.status(200).json({msg:"product delited success"})

    }catch(err){
        return res.status(500).json({msg:"internal server error"});

    }
}


export const SearchProduct=async(req:any,res:any)=>{
    const searchTerm = req.query.search as string;  
  
  if (!searchTerm) {
    return res.status(400).json({ msg: 'Search term is required' });
  }

  try {

    console.log("inside the seafch route")
    const filteredProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: searchTerm,
              mode: 'insensitive',  
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',  
            },
          },
        ],
      },
    });

    if (filteredProducts.length === 0) {
      return res.status(404).json({ msg: 'No products found' });
    }

    return res.status(200).json({ products: filteredProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }

}