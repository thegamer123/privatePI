<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Activity;

class ActivityController extends Controller
{

    // GET all tasks 
    public function getAllActivityAction()
    {
        $em = $this->getDoctrine()->getManager();
        $activities = $em->getRepository('AppBundle:Activity')->findAll();
        $data = $this->get('jms_serializer')->serialize($activities, 'json');
        $response = new Response($data);
        return $response;
    }


    // POST Team
    public function newActivityAction(Request $request) {
        
        $data = $request->getContent();
        //deserialize the data
        $activity = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Activity", "json");
        // add data to DB
        $em= $this->getDoctrine()->getManager();
        $em->persist($activity);
        $em->flush();
        return new Response(($activity->getId()), 201);
    }


    // Get one category by Id
    public function getActivitybyIdAction(Activity $activity) {
        $data = $this->get('jms_serializer')->serialize($activity, 'json');
        $response = new Response($data);
        return $response;
    }

    // PUT edit Team by id
    public function editActivityAction(Request $request, $id) {

        $doctrine = $this->getDoctrine();
        $manager = $doctrine->getManager();
        $activity_to_update = $doctrine->getRepository('AppBundle:Activity')->find($id);
        $data = $request->getContent();
        $activity = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Activity", "json");
        $activity_to_update->setStatus($activity->getStatus());
        $activity_to_update->setDate($activity->getDate());
        $manager->persist($activity_to_update);
        $manager->flush();
        return new Response('Activity updated successfully', 200);
    }


    // DELETE delete Team project by id
    public function deleteActivityAction(Request $request) {
        $id = $request->get('id');
        $manager = $this->getDoctrine()->getManager();
        $team = $manager->getRepository('AppBundle:Activity')->find($id);
        $manager->remove($team);
        $manager->flush();
        return new Response('Activity deleted successfully', 200);
    }

}