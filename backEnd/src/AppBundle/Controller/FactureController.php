<?php



namespace AppBundle\Controller;

use AppBundle\Entity\Facture;
use AppBundle\Service\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Facture controller.
 *
 * @Route("facture")
 */
class FactureController extends Controller
{
    /**
     * Lists all facture entities.
     *
     * @Route("/", name="facture_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $factures = $em->getRepository('AppBundle:Facture')->findAll();
        $data = $this->get('jms_serializer')->serialize($factures, "json");
        $response = new Response($data);
        return $response;


//        return $this->render('facture/index.html.twig', array(
//            'factures' => $factures,
//        ));
    }

    /**
     * Creates a new facture entity.
     *
     * @Route("/new", name="facture_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request,FileUploader $fileUploader)
    {
        $data = $request->getContent();
        //$facture = $this->get('jms_serializer')->deserialize($data, "AppBundle\Entity\Facture", "json");

        $factureToAdd = new Facture();
        $brochureFile = $request->get('data');
        var_dump($brochureFile);
        //stream_get_contents($stream);
     /*   $brochureFileName = $fileUploader->upload($stream);

        $factureToAdd->setName($brochureFileName);
        $factureToAdd->setData($brochureFile);
        $factureToAdd->setUrl("fsdfsf");
        $em = $this->getDoctrine()->getManager();
        $em->persist($factureToAdd);
        $em->flush();*/
        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>'Facture add successfully'

        );
        return new JsonResponse($response,201);
    }

    /**
     * Creates a form to delete a facture entity.
     *
     * @param Facture $facture The facture entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Facture $facture)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('facture_delete', array('id' => $facture->getId())))
            ->setMethod('DELETE')
            ->getForm();
    }

    /**
     * Displays a form to edit an existing facture entity.
     *
     * @Route("/{id}/edit", name="facture_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Facture $facture)
    {
        $deleteForm = $this->createDeleteForm($facture);
        $editForm = $this->createForm('FactureBundle\Form\FactureType', $facture);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('facture_edit', array('id' => $facture->getId()));
        }
        return $this->render('facture/edit.html.twig', array(
            'facture' => $facture,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a facture entity.
     *
     * @Route("/{id}", name="facture_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request)
    {
        $id = $request->get('id');
        $em = $this->getDoctrine()->getManager();
        $factures = $em->getRepository('AppBundle:Facture')->find($id);
        if (!$factures) {
            return new JsonResponse(['msg' => 'no facture found with the requested Id'], 400);
        }
        $em->remove($factures);
        $em->flush();
        return new JsonResponse(['msg' => 'deleted with success'], 200);
    }


    /**
     * @Route("/{id}",name="facture_details")
     * @Method({"GET"})
     */

    public function getFactureById($id)
    {

        $facture = $this->getDoctrine()->getRepository('AppBundle:Facture')->find($id);

        if (empty($facture)){
            $response=array(
                'code'=>1,
                'message'=>'post not found',
                'error'=>null,
                'result'=>null
            );

            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $data=$this->get('jms_serializer')->serialize($facture,'json');


        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>json_decode($data)

        );
        return new JsonResponse($response,200);

    }


}
