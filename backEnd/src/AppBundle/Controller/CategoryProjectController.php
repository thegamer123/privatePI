<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\CategoryProject;

class CategoryProjectController extends Controller
{
    // GET all 
    public function getAllCategoryAction()
    {
        $em = $this->getDoctrine()->getManager();
        $allCategory = $em->getRepository('AppBundle:CategoryProject')->findAll();
        $data = $this->get('jms_serializer')->serialize($allCategory, 'json');
        $response = new Response($data);
        return $response;
    }


    // POST CategoryProject
    public function newCategoryAction(Request $request) {
        
        $data = $request->getContent();
        //deserialize the data
        $category = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\CategoryProject", "json");
        // add data to DB
        $em= $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();
        return new Response('Category project added successfully', 201);
    }


    // Get one category by Id
    public function getCategoryProjectbyIdAction(CategoryProject $categoryProject) {
        $data = $this->get('jms_serializer')->serialize($categoryProject, 'json');
        $response = new Response($data);
        return $response;
    }

    // PUT edit categoryProject by id
    public function editCategoryProjectAction(Request $request, $id) {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $categoryProject_to_update = $doctrine->getRepository('AppBundle:CategoryProject')->find($id);
        $data = $request->getContent();
        $category = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\CategoryProject", "json");
        $categoryProject_to_update->setName($category->getName());
        $categoryProject_to_update->setdescription($category->getdescription());
        $manager->persist($categoryProject_to_update);
        $manager->flush();
        return new Response('Category project updated successfully', 200);
    }


    // DELETE delete category project by id
    public function deleteCategoryProjectAction(Request $request) {
        $id = $request->get('id');
        $manager = $this->getDoctrine()->getManager();
        $category = $manager->getRepository('AppBundle:CategoryProject')->find($id);
        $manager->remove($category);
        $manager->flush();
        return new Response('Category project deleted successfully', 200);
    }
}
