import { connectToDb } from "@/lib/utils"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server"
import { request } from "http";

export const GET = async (request) => {
    try{
        connectToDb();
        const posts = await Post.find();
        return NextResponse.json(posts);
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
}

export const DELETE = async (request,{params}) => {
    const {slug} = params;
    try{
        connectToDb();
        const post = await Post.findOneAndDelete({slug});
        return NextResponse.json("Post deleted.");
    } catch(err){
        console.log(err);
        throw new Error("Failed to delete post!");
    }
}