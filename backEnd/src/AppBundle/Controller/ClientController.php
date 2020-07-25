<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use AppBundle\Repository\ClientRepository;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityManager;
/**
 * Client controller.
 *
 * @Route("client")
 */
class ClientController extends Controller
{
    /**
     * Lists all client entities.
     *
     * @Route("/", name="client_index")
     * @Method("GET")
     */
    /*Get DATA*/
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $clients = $em->getRepository('AppBundle:Client')->findAll();

        $data = $this->get('jms_serializer')->serialize($clients, 'json');
        $response = new Response($data);
        return $response;
    }

    /**
     * Finds and displays a client entity.
     *
     * @Route("/{id}", name="client_show")
     * @Method("GET")
     */
    public function showByIdAction(Request $request)
    {

        $id = $request->get('id');
        $em = $this->getDoctrine($id)->getManager();
        $client = $em->getRepository('AppBundle:Client')->find($id);
        $data = $this->get('jms_serializer')->serialize($client, 'json');
        $response = new Response($data);

        return $response;
    }

    /**
     * Creates a new client entity.
     *
     * @Route("/new", name="client_new")
     * @Method({"GET", "POST"})
     */
    /*Add Data*/
    public function newAction(Request $request)
    {
        $data = $request->getContent();
        $client = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Client", "json");
        $em= $this->getDoctrine()->getManager();
        $em->persist($client);
        $em->flush();
        return new Response('project added successfully', 201);

    }

    /**
     * Deletes a client entity.
     *
     * @Route("/{id}", name="client_delete")
     * @Method("DELETE")
     */
    /*delete DATA */
    public function deleteAction(Request $request)
    {
        $id = $request->get('id');
        $em = $this->getDoctrine($id)->getManager();
        $client = $em->getRepository('AppBundle:Client')->find($id);
        $em->remove($client);
        $em->flush();

        return new JsonResponse(['msg' =>'deleted with succes!'], 200);

    }
    /**

     * @Route("/{id}", name="client_edit")
     * @Method("PUT")

     */
    /*Update DATA*/
    public function editAction(Request $request, $id)
    {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $client_to_update = $doctrine->getRepository('AppBundle:Client')->find($id);
        $data = $request->getContent();
        $client = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Client", "json");

        $client_to_update->setAddress($client->getAddress());
        $client_to_update->setSocialReason($client->getSocialReason());
        $client_to_update->setGeneralManager($client->getGeneralManager());
        $client_to_update->setEmail($client->getEmail());
        $client_to_update->setPhone($client->getPhone());

        $manager->persist($client_to_update);
        $manager->flush();

        return new JsonResponse(['msg' =>'Projet upodated successfully!'], 200);
    }

}
