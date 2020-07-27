<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Repository\ProjetRepository;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManager;

/**
 * Projet controller.
 *
 * @Route("projet")
 */
class ProjetController extends Controller
{

    /**
     * Creates a new projet entity.
     *
     * @Route("/new/{id}", name="projet_new")
     * @Method({"GET", "POST"})
     */
    /*Add Data*/
    public function newAction(Request $request)
{
//get content of data sent by ARC
    $data = $request->getContent();
        $em= $this->getDoctrine()->getManager();

//deserialize the data
    $projet = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Projet", "json");
        $id = $request->get('id');
        $client = $em->getRepository('AppBundle:Client')->find($id);

        $projet->setClient($client);

// added my data in data base
    $em->persist($projet);
    $em->flush();
    return new Response('project added successfully', 201);

//you can use line number 37 or  line number 39

}

    /**
     * Deletes a projet entity.
     *
     * @Route("/{id}", name="projet_delete")
     * @Method("DELETE")
     */
    /*delete DATA */
    public function deleteAction(Request $request)
    {
        $id = $request->get('id');
        $em = $this->getDoctrine($id)->getManager();
        $projet = $em->getRepository('AppBundle:Projet')->find($id);
        $em->remove($projet);
        $em->flush();

        return new JsonResponse(['msg' =>'deleted with succes!'], 200);

    }


    /**
     * Lists  projet entitie.
     *
     * @Route("/get/{id}", name="projet_index")
     * @Method("GET")
     */
    /*Get Data By Id*/
   public function showByidAction(Request $request)

    {
        $id = $request->get('id');
        $em = $this->getDoctrine($id)->getManager();
        $projet = $em->getRepository('AppBundle:Projet')->find($id);
        $data = $this->get('jms_serializer')->serialize($projet, 'json');
        $response = new Response($data);

        return $response;
    }

    /**

     * @Route("/{id}", name="projet_edit")
     * @Method("PUT")

     */
    /*Update DATA*/
    public function editAction(Request $request, $id)
    {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $projet_to_update = $doctrine->getRepository('AppBundle:Projet')->find($id);
        $data = $request->getContent();
        $projet = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Projet", "json");


        $projet_to_update->setName($projet->getName());
        $projet_to_update->setDescription($projet->getDescription());
        $projet_to_update->setOthers($projet->getOthers());
        $projet_to_update->setStatus($projet->getStatus());
        $projet_to_update->setDeadline($projet->getDeadline());
        $projet_to_update->setClient($projet->getClient());
      /*  $projets->setContent($projet->getContent());*/

        $manager->persist($projet_to_update);
        $manager->flush();

        return new JsonResponse(['msg' =>'Projet upodated successfully!'], 200);
    }


    /**
     * Lists all projet entities.
     *
     * @Route("/", name="projet_index")
     * @Method("GET")
     */
    /*Get DATA*/
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $projets = $em->getRepository('AppBundle:Projet')->findAll();

        $data = $this->get('jms_serializer')->serialize($projets, 'json');
        $response = new Response($data);
        return $response;
    }




    /**
     * Lists all projet entities.
     *
     * @Route("/activeProjects", name="projet_index")
     * @Method("GET")
     */
    /*Get DATA*/
    public function activeAction()
    {
        $em = $this->getDoctrine()->getManager();

        $projetsValid = $em->getRepository('AppBundle:Projet')->findBy(array('status' => 'valid'));
        $projetsInValid = $em->getRepository('AppBundle:Projet')->findBy(array('status' => 'not valid'));
        $projetsValidCount = count($projetsValid);
        $projetsNotValidCount = count($projetsInValid);


        $response=array(
            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'projetsValidCount'=>$projetsValidCount,
            'projetsNotValidCount'=>$projetsNotValidCount,
        );
        return new JsonResponse($response,200);
    }

}
